# Usage
```
// Import using ES6 syntax
import ConditionalStyleSheet from 'react-native-conditional-stylesheet';

// ... or use `require`
const ConditionalStyleSheet = require('react-native-conditional-stylesheet');

// Create conditional style builder as you would create traditional styles.
const buildStyle = ConditionalStyleSheet.create({
  base: {
    fontSize: 200,
    backgroundColor: 'white',
  },
  success: {
    color: 'green',
  },
  danger: {
    color: 'red',
  },
});

const Button = (props) => {
  let style;

  // Build style:
  //
  // 1, Explicitly name styles to pick & use
  style = buildStyle('base', 'active');

  // 2, Selectively pick styles based on given conditions
  style = buildStyle('base', {
    success: props.success,
    danger: props.danger,
  });

  // 3, Push custom style on the fly for additional styling
  // or to override previously passed styles
  style = buildStyle('base', {
      success: props.success,
      danger: props.danger,
    },
    {
      fontWeight: 'bold',
      backgroundColor: 'black',
    }
  );

  return (
    <View>
      <Text style={style}>{ props.children }</Text>
    </View>
  );
}
```

# TODO
- docs
- HOC
- automatically pick platform specific styles when object contains `ios` or `android` keys
