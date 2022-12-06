const formatValue = (value: number) =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });

export default formatValue;
