import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wp, scale, fontSize, padding, margin, borderRadius } from '../../../utils/responsive';
import { goBack } from '../../../navigation/navigationService';
import CustomIcon, { IconNames } from '../../../components/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CIRCLE = wp(28);

const chunkArray = (arr: any[], size: number) => {
    const result = [];

    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }

    return result;
};

interface CircleItem {
    title: string;
    image: any;
}

interface CircleProps {
    item: CircleItem;
    onPress?: () => void;
}

const Circle = ({ item, onPress }: CircleProps) => (
    <TouchableOpacity style={styles.circle} onPress={onPress} activeOpacity={0.7}>
        <Image source={item.image} style={styles.icon} resizeMode="contain" />
        <Text style={styles.label}>{item.title}</Text>
    </TouchableOpacity>
);

interface CategoryLayoutProps {
    title: string;
    items: CircleItem[];
    layout?: 'grid' | 'center';
    onItemPress?: (item: CircleItem) => void;
}

const CategoryLayout = ({ title, items, layout = 'grid', onItemPress }: CategoryLayoutProps) => {
    const rows = chunkArray(items, 3);

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.brand}>Jolloyard</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.headerBtn}>
            <CustomIcon name={IconNames.search} size={fontSize(18)} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <CustomIcon name={IconNames.notifications} size={fontSize(18)} color="#000" />
          </TouchableOpacity>
        </View>
            </View>




            {/* CONTENT */}
            <View style={styles.content}>
                {/* BACK TITLE */}
                <TouchableOpacity style={styles.backRow} onPress={goBack}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                    <Text style={styles.backText}> Back</Text>
                </TouchableOpacity>
                {/* ✅ GRID LAYOUT */}
                {layout === 'grid' &&
                    rows.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((item, i) => (
                                <Circle
                                    key={i}
                                    item={item}
                                    onPress={() => onItemPress?.(item)}
                                />
                            ))}
                        </View>
                    ))}

                {/* ✅ CENTER LAYOUT */}
                {layout === 'center' && (
                    <>
                        {rows[0] && (
                            <View style={styles.row}>
                                {rows[0].map((item, i) => (
                                    <Circle
                                        key={i}
                                        item={item}
                                        onPress={() => onItemPress?.(item)}
                                    />
                                ))}
                            </View>
                        )}

                        {rows[1] && (
                            <View style={styles.centerRow}>
                                {rows[1].map((item, i) => (
                                    <Circle
                                        key={i}
                                        item={item}
                                        onPress={() => onItemPress?.(item)}
                                    />
                                ))}
                            </View>
                        )}
                    </>
                )}
            </View>

            {/* ADD ADDRESS */}
            <TouchableOpacity

                style={styles.addBtn}>
                <Text style={styles.addText}>＋ Add address</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default CategoryLayout;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#3FA565' },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: padding.xl,
        paddingVertical: padding.lg,
    },

    brand: {
        fontSize: fontSize(28),
        color: '#fff',
        fontWeight: '600',
    },

    headerBtn: {
        width: scale(46),
        height: scale(46),
        borderRadius: scale(23),
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: margin.md,
    },

    back: {
        color: '#fff',
        fontSize: fontSize(20),
        marginLeft: padding.xl,
        marginBottom: margin.sm,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    centerRow: {
        marginTop: margin.lg,
        alignItems: 'center',
    },

    circle: {
        width: CIRCLE,
        height: CIRCLE,
        borderRadius: CIRCLE / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: padding.md,
        marginVertical: margin.md,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: scale(8),
        elevation: 8,
    },

    icon: {
        width: CIRCLE * 0.38,
        height: CIRCLE * 0.38,
        marginBottom: margin.sm,
    },

    label: {
        textAlign: 'center',
        fontSize: fontSize(14),
        fontWeight: '600',
    },

    addBtn: {
        margin: padding.xl,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: borderRadius.xl,
        padding: padding.lg,
        alignItems: 'center',
    },

    addText: {
        color: '#fff',
        fontSize: fontSize(18),
        fontWeight: '500',
    },
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backArrow: {
        color: '#fff',
        fontSize: fontSize(28),
        marginRight: margin.sm,
    },

    backText: {
        color: '#fff',
        fontSize: fontSize(27),
        fontWeight: '500',
    },

});
