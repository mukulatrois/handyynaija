import { ActivityIndicator, View } from "react-native";


export const Loadingcomponent = () => {
    return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position:'absolute',
            width:'100%',
            height:'100%'
          }}
          >
          <ActivityIndicator size={'large'} color={"#3FA565"} />
        </View>
    );
  };