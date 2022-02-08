import {Button, StyleSheet, Text, View} from "react-native";

export function Note(item: Note) {
    return (
        <View style={noteItemStyles.container}>
            <View style={noteItemStyles.text}>
                <Text>{item.title}</Text>
                <Text>{item.content}</Text>
            </View>
            <Button title={"X"} onPress={() => item.onDeleteNote}/>
        </View>
    )
}

export const noteItemStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: "row",
        justifyContent:"space-between",
        marginTop:8
    },
    text: {
        flexDirection: "column"
    }
})

export interface Note {
    title: string,
    content: string,
    onDeleteNote?: ()=> void,
    id:number
}
