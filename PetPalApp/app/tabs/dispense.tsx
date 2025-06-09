import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Button, } from 'react-native';
import Svg, { Polygon, Text as SvgText } from 'react-native-svg';

type Triangle = {
  points: string;
  bounds: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  label: string;
  labelX: number;
  labelY: number;
};

const TreatDispenser: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleDispense = () => {
    if (selectedIndex !== null) {
      Alert.alert(`Dispensing from Bucket ${selectedIndex + 1}`);
      (async () => {
        console.log('button')
        const response = await fetch("https://petpal-3yfg.onrender.com/api/motor", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "motor": selectedIndex
            })
        });
        console.log('here')
        const data = await response.json();
        if (response.ok) {
          console.log("Login success:", data);
        } else {
          console.error("Login failed:", data);
          alert("Invalid Credentials")
        }
      })()
      router.push('/tabs/feed')
    } else {
      Alert.alert('No Bucket selected', 'Please tap a triangle to select a bucket.');
    }
  };

  const center = { x: 150, y: 150 };
  const radius = 120;

  const triangles: Triangle[] = Array.from({ length: 6 }, (_, i) => {
    const angle1 = ((Math.PI * 2) / 6) * i - Math.PI / 2;
    const angle2 = angle1 + (Math.PI * 2) / 6;

    const x1 = center.x + radius * Math.cos(angle1);
    const y1 = center.y + radius * Math.sin(angle1);
    const x2 = center.x + radius * Math.cos(angle2);
    const y2 = center.y + radius * Math.sin(angle2);

    const labelX = (center.x + x1 + x2) / 3;
    const labelY = (center.y + y1 + y2) / 3;

    return {
      points: `${center.x},${center.y} ${x1},${y1} ${x2},${y2}`,
      bounds: {
        left: Math.min(center.x, x1, x2),
        top: Math.min(center.y, y1, y2),
        right: Math.max(center.x, x1, x2),
        bottom: Math.max(center.y, y1, y2),
      },
      label: `Bucket ${i + 1}`,
      labelX,
      labelY,
    };
  });
  return (
    <View style={styles.container}>
        <View style={{borderColor: 'black', borderWidth: 1, paddingLeft: 90, paddingRight: 90, borderRadius: 30, backgroundColor: '#7fc4db', marginBottom: 60}}>
            <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center'}}>PetPal</Text>
        </View>
      <Text style={styles.title}>Treat Dispenser</Text>
      <View style={{ width: 300, height: 300 }}>
        <Svg width="300" height="300">
          {triangles.map((t, index) => (
            <Polygon
              key={`polygon-${index}`}
              points={t.points}
              fill={selectedIndex === index ? '#ffd6f6' : '#888'}
              stroke="#333"
              strokeWidth="2"
            />
          ))}

          {triangles.map((t, index) => (
            <SvgText
              key={`label-${index}`}
              x={t.labelX}
              y={t.labelY}
              fill="#000"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {t.label}
            </SvgText>
          ))}
        </Svg>

        {triangles.map((t, index) => (
          <Pressable
            key={`pressable-${index}`}
            onPress={() => toggle(index)}
            style={{
              position: 'absolute',
              left: t.bounds.left,
              top: t.bounds.top,
              width: t.bounds.right - t.bounds.left,
              height: t.bounds.bottom - t.bounds.top,
            }}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Dispense" onPress={handleDispense} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default TreatDispenser;
