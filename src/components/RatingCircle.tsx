import React from 'react';
import { Text, View } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';

interface RatingCircleProps {
  rating: number;
  radius?: number;
}

const RatingCircle: React.FC<RatingCircleProps> = ({ rating, radius = 30 }) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - rating) / 100) * circumference;

  const getRatingColor = () => {
    if (rating > 75) return 'green';
    if (rating > 50) return 'yellow';
    return 'red';
  };

  // SVG circle arc calculation
  const circlePath = `
    M ${radius * 2} ${radius}
    m -${radius}, 0
    a ${radius},${radius} 0 1,0 ${radius * 2},0
    a ${radius},${radius} 0 1,0 -${radius * 2},0
  `;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg
        height={radius * 2 + 10}
        width={radius * 2 + 10}
        viewBox={`0 0 ${radius * 2 + 10} ${radius * 2 + 10}`}
      >
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          stroke="#ccc"
          strokeWidth="5"
          fill="transparent"
        />
        <Path
          d={circlePath}
          stroke={getRatingColor()}
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ position: 'absolute' }}>
        <Text style={{ fontSize: 14 }}>{rating}</Text>
      </View>
    </View>
  );
};

export default RatingCircle;
