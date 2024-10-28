import { Input } from "@ui-kitten/components"

const Textfield = (props: any) => {
    const { placeholder, value, onChangeText, multiline } = props
    return <Input
        placeholder={placeholder}
        onChangeText={onChangeText}
        multiline={multiline ?? false}
    >
        {value}
    </Input>
}

export default Textfield