import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { goBack, navigate } from "../../../navigation/navigationService";
import {
    scale,
    fontSize,
    padding,
    margin,
    borderRadius,
} from "../../../utils/responsive";
import ServiceScreenHeader from "./ServiceScreenHeader";

interface DataItem {
    id: string;
    recommended?: boolean;
}

export default function FindProfessionalsScreen() {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const data: DataItem[] = [
        { id: "1", recommended: true },
        { id: "2" },
    ];

    const specifications = [
        { icon: "business-outline", text: "Business Profile" },
        { icon: "refresh-outline", text: "7 have repeated" },
        { icon: "calendar-outline", text: "Updated schedule" },
        { icon: "cash-outline", text: "Minimum charge ₦30" },
        { icon: "time-outline", text: "Available 24/7" },
        { icon: "shield-checkmark-outline", text: "Verified Professional" },
    ];

    const renderItem = ({ item }: { item: DataItem }) => {
        const isExpanded = expandedCard === item.id;
        const visibleSpecs = isExpanded
            ? specifications
            : specifications.slice(0, 4);

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigate('ProfessionalDetail', { professionalId: item.id })}
                style={[
                    styles.card,
                    item.recommended && styles.recommendedCard,
                ]}
            >
                {/* Recommended Badge */}
                {item.recommended && (
                    <View style={styles.recommendedBanner}>
                        <Ionicons
                            name="shield-checkmark"
                            size={18}
                            color="#fff"
                            style={{ marginRight: 8 }}
                        />
                        <Text style={styles.recommendedText}>
                            Recommended service
                        </Text>
                    </View>
                )}
                {/* Top Section */}
                <View style={styles.topRow}>
                    <Image
                        source={require("../../../Images/logo.png")}
                        style={styles.profile}
                    />

                    <View style={styles.cardContent}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>Nicolas bond</Text>
                            <Ionicons
                                name="shield-checkmark"
                                size={scale(14)}
                                color="#2DBE60"
                                style={styles.verifyIcon}
                            />
                        </View>

                        <Text style={styles.job}>Handyman</Text>

                        <View style={styles.priceRow}>
                            <Text style={styles.price}>₦20.50</Text>
                            <Text style={styles.perHour}> Per hour</Text>
                            <View style={{ flex: 1 }} />
                            <Text style={styles.services}>656 Services</Text>
                        </View>

                        <View style={styles.ratingRow}>
                            {[1, 2, 3, 4].map((_, i) => (
                                <FontAwesome
                                    key={i}
                                    name="star"
                                    size={scale(12)}
                                    color="#FFA500"
                                />
                            ))}
                            <FontAwesome name="star-o" size={scale(12)} color="#ccc" />
                            <Text style={styles.reviewText}>
                                {" "}
                                4.8 | 4,323 Reviews
                            </Text>
                        </View>
                    </View>

                    <Feather
                        name="heart"
                        size={scale(22)}
                        color="#2DBE60"
                        style={styles.heartIcon}
                    />
                </View>

                {/* Specifications */}
                <View style={styles.specContainer}>
                    {visibleSpecs.map((spec, index) => (
                        <View key={index} style={styles.tag}>
                            <Ionicons
                                name={spec.icon as any}
                                size={scale(16)}
                                color="#777"
                            />
                            <Text style={styles.tagText}>{spec.text}</Text>
                        </View>
                    ))}
                </View>

                {/* View More */}
                {specifications.length > 4 && (
                    <TouchableOpacity
                        onPress={() =>
                            setExpandedCard(isExpanded ? null : item.id)
                        }
                        style={styles.viewMoreBtn}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.viewMoreText}>
                            {isExpanded ? "View less" : "View more"}
                        </Text>
                    </TouchableOpacity>
                )}

                <View style={styles.divider} />

                <View style={styles.imageRow}>
                    {[1, 2, 3, 4].map((_, i) => (
                        <Image
                            key={i}
                            source={require("../../../Images/logo.png")}
                            style={styles.workImage}
                        />
                    ))}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.headerWrapper}>
                        <ServiceScreenHeader
                            title="Handyman"
                            showBack
                            onBackPress={goBack}
                            subtitleElement={
                                <View style={styles.headerLocationRow}>
                                    <Ionicons name="location-outline" size={14} color="#666" />
                                    <Text style={styles.headerLocation}>Ungwan Kifi, Nigeria</Text>
                                </View>
                            }
                        />

                        {/* GUARANTEE */}
                        <View style={styles.guaranteeCard}>
                            <Image
                                source={require("../../../Images/secure.png")}
                                style={styles.secureIcon}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.guaranteeTitle}>
                                    Handynija Guarantee
                                </Text>
                                <Text style={styles.guaranteeSub}>
                                    All service are protected by handynija
                                    money-back guarantee
                                </Text>
                            </View>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5" },

    headerWrapper: { marginBottom: 10 },

    headerLocationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 4,
    },

    headerLocation: {
        fontSize: 12,
        color: "#666",
    },

    guaranteeCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E9E9E9",
        marginHorizontal: 16,
        borderRadius: 20,
        padding: 16,
    },

    secureIcon: { width: 50, height: 50, marginRight: 12 },

    guaranteeTitle: { fontWeight: "600", fontSize: 16 },

    guaranteeSub: { fontSize: 12, color: "#555", marginTop: 4 },

    card: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginVertical: 12,
        borderRadius: 24,
        padding: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    recommendedCard: {
        backgroundColor: "#F2F2F2",
    },

    recommendedBanner: {
        backgroundColor: "#3FA463",
        paddingVertical: 16,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 18,
    },

    recommendedText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },


    topRow: { flexDirection: "row" },

    profile: {
        width: 60,
        height: 60,
        borderRadius: 16,
    },

    cardContent: {
        flex: 1,
        marginLeft: 14,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    name: {
        fontWeight: "700",
        fontSize: 17,
        color: "#222",
    },

    verifyIcon: { marginLeft: 4 },

    job: { fontSize: 14, color: "#666", marginTop: 2 },

    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },

    price: {
        color: "#2DBE60",
        fontWeight: "700",
        fontSize: 16,
    },

    perHour: { fontSize: 12, color: "#666" },

    services: { fontSize: 12, color: "#666" },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    reviewText: {
        fontSize: 12,
        color: "#666",
        marginLeft: 6,
    },

    heartIcon: {
        position: "absolute",
        right: 0,
        top: 0,
    },

    specContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 14,
    },

    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F1F1",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 40,
        marginRight: 10,
        marginBottom: 10,
    },

    tagText: {
        fontSize: 12,
        marginLeft: 6,
        color: "#555",
    },

    viewMoreBtn: {
        alignSelf: "flex-start",
    },

    viewMoreText: {
        color: "#2DBE60",
        fontWeight: "600",
        fontSize: 13,
    },

    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 14,
    },

    imageRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    workImage: {
        width: 70,
        height: 70,
        borderRadius: 20,
    },
});
