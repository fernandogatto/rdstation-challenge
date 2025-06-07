const StatsCard = ({
  title,
  value,
  color = 'blue',
  formatValue = (val) => val || 0,
  className = '',
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      valueColor: 'text-blue-900',
    },
    green: {
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      valueColor: 'text-green-900',
    },
    purple: {
      bg: 'bg-purple-50',
      textColor: 'text-purple-600',
      valueColor: 'text-purple-900',
    },
    orange: {
      bg: 'bg-orange-50',
      textColor: 'text-orange-600',
      valueColor: 'text-orange-900',
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`${colors.bg} rounded-lg p-4 ${className}`}>
      <div className={`text-sm ${colors.textColor} font-medium`}>{title}</div>
      <div className={`text-2xl font-bold ${colors.valueColor}`}>
        {formatValue(value)}
      </div>
    </div>
  );
};

export default StatsCard;
