export const formatNumber = (x: number): string => {
    const fixed = x.toFixed(2)
    const withoutDecimal = fixed.endsWith(".00") ? fixed.substring(0, fixed.length - 3) : fixed
    const parts = withoutDecimal.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}
