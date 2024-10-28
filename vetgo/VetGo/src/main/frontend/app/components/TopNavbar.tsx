import { View, Text } from "react-native"
import { Icon } from '@ui-kitten/components'


const TopNavbar = (props: any) => {
    return (
        <View>
            <Text onPress={() => props.navigation.navigate('Menu')}>Menu</Text>
            {/* <Icon
                fill='#8F9BB3'
                name='menu-outline'
                onPress={() => props.navigation.navigate('Menu')}
            /> */}
        </View>
    )
}

export default TopNavbar
