import { ActivityIndicator, View } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../utils/constants";


export const Loadingcomponent = () => {
  return (
    <Modal isVisible={true} backdropOpacity={0.5}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <ActivityIndicator size={'large'} color={COLORS.PRIMARY} />
      </View>
    </Modal>

  );
};