interface FormatNumberOptions {
    style?: "decimal" | "currency";
    currency?: string;
    useGrouping?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
  
  const FormatNumber = (
    number: number,
    options: FormatNumberOptions = {}
  ): string => {
    const {
      style = "currency",
      currency = "USD",
      useGrouping = true,
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
    } = options;
  
    const formattedNumber = new Intl.NumberFormat('en-US', {
      style,
      currency,
      useGrouping,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(number);
  
  
  
    // Si es decimal y se quiere como porcentaje, añadir el símbolo %
    return style === 'decimal' ? `${formattedNumber}%` : formattedNumber;
  };
  
  export { FormatNumber };
  