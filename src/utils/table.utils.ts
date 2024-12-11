import { DictionaryType } from "@/types/common.type";

interface TableTransformOptions {
  rowKeyPrefix?: string;
  sortRows?: boolean;
  formatValue?: (value: any) => any;
}

export class TableUtils {
  /**
   * Transforms column-based data structure into row-based format for table display
   * @param data Column-based data object where each key represents a column
   * @param options Configuration options for transformation
   * @returns Object containing transformed row data and metadata
   */
  static transformToTableData(
    data: DictionaryType,
    options: TableTransformOptions = {},
  ) {
    if (!data) return { columns: [], rows: [], rowHeaders: [] };

    const { rowKeyPrefix = "", sortRows = true, formatValue } = options;

    // Get columns while preserving original order
    const columns = Object.keys(data);
    if (columns.length === 0) return { columns: [], rows: [], rowHeaders: [] };

    // Get row keys from first column's data
    let rowHeaders = Object.keys(data[columns[0]]);

    // Sort row headers if needed
    if (sortRows && rowKeyPrefix) {
      rowHeaders = rowHeaders.sort((a, b) => {
        const numA = parseInt(a.replace(rowKeyPrefix, ""));
        const numB = parseInt(b.replace(rowKeyPrefix, ""));
        return numA - numB;
      });
    }

    // Transform into row-based data
    const rows = rowHeaders.map((rowKey) => {
      const rowData: DictionaryType = {};
      columns.forEach((colKey) => {
        let value = data[colKey][rowKey];
        if (formatValue) {
          value = formatValue(value);
        }
        rowData[colKey] = value;
      });
      return rowData;
    });

    return {
      columns,
      rows,
      rowHeaders,
    };
  }
}
