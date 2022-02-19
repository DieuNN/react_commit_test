import {
    Button,
    FlatList, KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View
} from "react-native";
import React, {useState} from "react";
import {Note, noteItemStyles} from "./components/note.item";

// lagging

export default function App() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [data, setData] = useState<Note[]>([]);

    const renderItem = ({item}: { item: Note }) => (
        <View style={noteItemStyles.container}>
            <View style={noteItemStyles.text}>
                <Text>{item.title}</Text>
                <Text>{item.content}</Text>
            </View>
            <Button title={"X"} onPress={() => {
                let filteredList = data.filter(value => (value != item))
                setData(Array.from(filteredList))
            }}/>
        </View>
    )

    const getNoteInDataList = (title: string): Note | null => {
        if (data.filter(value => value.title == title).length > 0) {
            return data.filter(value => value.title == title)[0]
        } else {
            return null
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"}/>
            <KeyboardAvoidingView style={styles.inputForm}>
                <View style={styles.titleInputContainer}>
                    <Text style={styles.text}>Tiêu đề</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
                </View>
                <View style={styles.contentInputContainer}>
                    <Text style={styles.text}>Nội dung</Text>
                    <TextInput style={styles.input} value={content} onChangeText={text => setContent(text)}/>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button title={"Thêm"} onPress={() => {
                        if (title.length == 0) {
                            if (Platform.OS == "android") ToastAndroid.show("Chưa nhập tiêu đề!", ToastAndroid.SHORT)
                            if (Platform.OS == "web") alert("Chưa nhập tiêu đề!")
                            return
                        }
                        const newNote: Note = {
                            title: title,
                            content: content,
                            id: data.length
                        }
                        data.push(newNote)
                        setData(Array.from(data))
                    }}/>
                    <Button title={"Sửa"} onPress={() => {
                        let note = getNoteInDataList(title)
                        if (note != null) {
                            let index = data.findIndex(value => value.title == note?.title)
                            console.log(index)
                            data[index] = {
                                title : title,
                                content: content,
                                id : data.length
                            }
                            setData(Array.from(data))
                        }
                    }}/>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.listView}>
                <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id.toString()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        marginBottom:32
    },
    inputForm: {
        height: '20%',
        flexDirection: "column"
    },
    listView: {
        height: '80%',
        marginTop: 16
    },
    titleInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        flex: 2,
        textAlign: "center",
    },
    input: {
        flex: 8,
        height: 36,
        borderWidth: 1,
        borderColor: 'grey',
        paddingLeft: 8,
        paddingRight: 8
    },
    contentInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8
    },
    buttonsContainer: {
        flexDirection: "row",
        marginTop: 8,
        justifyContent: "space-evenly"
    }
})


