import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { goBack } from "../../../navigation/navigationService";
import ServiceScreenHeader from "./ServiceScreenHeader";

export default function ProfessionalDetailScreen() {

    const InfoItem = ({ icon, text }: any) => (
        <View style={styles.infoItem}>
            <Ionicons name={icon} size={20} color="#2DBE60" />
            <Text style={styles.infoText}> {text}</Text>
        </View>
    );

    const RatingRow = ({ title, rating }: any) => (
        <View style={styles.ratingItem}>
            <Text>{title}</Text>
            <Text>{rating}</Text>
        </View>
    );

    const FAQItem = ({ text }: any) => (
        <TouchableOpacity style={styles.faqItem}>
            <Text>{text}</Text>
            <Ionicons name="chevron-forward" size={18} />
        </TouchableOpacity>
    );

    const PolicyRow = ({ left, right }: any) => (
        <View style={styles.policyRow}>
            <Text>{left}</Text>
            <Text>{right}</Text>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            <ServiceScreenHeader
                title="Nicolas bond's profile"
                showBack
                onBackPress={goBack}
            />
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* PROFILE IMAGE */}
                <Image
                    source={require("../../../Images/logo.png")}
                    style={styles.mainImage}
                />

                {/* NAME + RATING */}
                <View style={styles.section}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>Nicolas bond on Handynija</Text>
                        <Feather name="heart" size={22} color="#2DBE60" />
                    </View>

                    <View style={styles.ratingRow}>
                        {[1, 2, 3, 4].map((_, i) => (
                            <FontAwesome key={i} name="star" size={16} color="#FFA500" />
                        ))}
                        <FontAwesome name="star-o" size={16} color="#ccc" />
                        <Text style={styles.ratingText}> 4.8 | 4,323 Reviews</Text>
                    </View>

                    <View style={styles.locationRow}>
                        <Ionicons name="location-outline" size={18} color="#777" />
                        <Text style={styles.locationText}> Ungwan Kifi, Nigeria</Text>
                    </View>
                </View>

                {/* INFO LIST */}
                <View style={styles.infoSection}>
                    <InfoItem icon="ribbon-outline" text="Top Professional" />
                    <InfoItem icon="home-outline" text="122 Completed services" />
                    <InfoItem icon="star-outline" text="Average rating of 4.9/5" />
                    <InfoItem icon="shield-checkmark-outline" text="Verified profile" />
                </View>

                {/* BUTTON */}
                <TouchableOpacity style={styles.messageBtn}>
                    <Ionicons name="chatbubble-outline" size={20} />
                    <Text style={styles.messageText}> Send message</Text>
                </TouchableOpacity>

                {/* ABOUT */}
                <Text style={styles.sectionTitle}>About me</Text>
                <Text style={styles.aboutText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </Text>

                {/* PHOTOS */}
                <View style={styles.photoRow}>
                    {[1, 2, 3].map((_, i) => (
                        <Image
                            key={i}
                            source={require("../../../Images/logo.png")}
                            style={styles.photo}
                        />
                    ))}
                </View>

                {/* RATINGS */}
                <Text style={styles.sectionTitle}>Client’s ratings</Text>

                <View style={styles.ratingSummary}>
                    <Text style={styles.outstanding}>Outstanding</Text>
                    <Text style={styles.bigRating}>⭐ 4.8</Text>
                </View>

                <RatingRow title="Service" rating="4.8" />
                <RatingRow title="Value for money" rating="5" />
                <RatingRow title="Professionalism" rating="5" />
                <RatingRow title="Punctuality" rating="4.8" />

                {/* FAQ */}
                <Text style={styles.sectionTitle}>Frequent to asked questions</Text>
                <FAQItem text="How does it work?" />
                <FAQItem text="What does the cleaning included?" />
                <FAQItem text="How much time should i book?" />

                {/* CANCELLATION */}
                <Text style={styles.sectionTitle}>Cancellation policy</Text>
                <PolicyRow left="Up to 24 hours" right="Free cancellation" />
                <PolicyRow left="From 24h to 4h" right="75% refund" />
                <PolicyRow left="From 4h to 45min" right="50% refund" />

                <View style={{ height: 100 }} />

            </ScrollView>

            {/* STICKY BOTTOM */}
            <View style={styles.bottomBar}>
                <Text style={styles.price}>₦13.50/h</Text>
                <TouchableOpacity style={styles.availabilityBtn}>
                    <Text style={styles.availabilityText}>View Availability</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10
    },

    mainImage: {
        width: "90%",
        height: 250,
        alignSelf: "center",
        borderRadius: 20
    },

    section: { padding: 16 },

    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2DBE60"
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6
    },

    ratingText: { marginLeft: 6, color: "#666" },

    locationRow: {
        flexDirection: "row",
        marginTop: 6
    },

    locationText: { color: "#777" },

    infoSection: { paddingHorizontal: 16 },

    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6
    },

    infoText: { marginLeft: 10 },

    messageBtn: {
        margin: 16,
        padding: 14,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },

    messageText: { fontWeight: "600" },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2DBE60",
        margin: 16
    },

    aboutText: { marginHorizontal: 16, color: "#555" },

    photoRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16
    },

    photo: {
        width: 100,
        height: 100,
        borderRadius: 20
    },

    ratingSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16
    },

    outstanding: { fontSize: 18, fontWeight: "600" },
    bigRating: { fontSize: 18, fontWeight: "600" },

    ratingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginVertical: 6
    },

    faqItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#eee"
    },

    policyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginVertical: 6
    },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee"
    },

    price: { fontSize: 22, fontWeight: "700" },

    availabilityBtn: {
        backgroundColor: "#2DBE60",
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 14
    },

    availabilityText: {
        color: "#fff",
        fontWeight: "600"
    }
});
