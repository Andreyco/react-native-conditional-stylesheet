# Usage
```
import { StyleSheet } from 'react-native';
import createSelector from 'react-native-conditional-stylesheet';

const styleSheet = StyleSheet.create({
    button: {
        backgroundColor: 'gray',
        padding: 20,
        borderRadius: 5,
    },
    buttonBlue: {
        backgroundColor: 'blue',
    },
    buttonRed: {
        backgroundColor: 'red',
    },
});
const select = createSelector(styleSheet);

class Button extends Component {
    static propTypes = {
        // Background color variations
        blue: PropTypes.bool,
        red: PropTypes.bool,
    }

    render() {
        // We use `button` as base style. Base on props button becomes blue or red, or stays gray.
        const style = select('button', {
            buttonBlue: this.props.blue,
            buttonRed: this.props.red,
        });

        // If you want to add some styles on the fly, use `.add` method to pass it down.
        style.add({ marginBottom: this.props.last ? 0 : 25 });

        return (
            <View style={style}>
                <Text>Press Me<Text/>
            </View>
        );
    }
}
```

# TODO
- docs
- HOC
- automatically pick platform specific styles when object contains `ios` or `android` keys
