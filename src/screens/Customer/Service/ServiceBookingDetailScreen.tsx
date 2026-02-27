import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { goBack, navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../../utils/responsive';
import ServiceScreenHeader from './ServiceScreenHeader';

const FEEDBACK_TAGS = [
  'Polite Professional',
  'Careful Professional',
  'Good behavior',
  'Professional work good',
  'Comfortable Professional',
];

const ROUTE_COORDS = [
  { latitude: 6.5244, longitude: 3.3792 },
  { latitude: 6.528, longitude: 3.382 },
  { latitude: 6.531, longitude: 3.385 },
];

const BOOKING_STATUS = 'accepted'; // 'accepted' | 'done'

export default function ServiceBookingDetailScreen() {
  const refPaymentSheet = useRef<any>(null);
  const refFeedbackSheet = useRef<any>(null);

  const [starRating, setStarRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState('');

  const isDone = BOOKING_STATUS === 'accepted';

  useEffect(() => {
    if (isDone && refFeedbackSheet.current) {
      refFeedbackSheet.current?.open();
    }
  }, [isDone]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const openAddCommentModal = () => {
    setCommentInputValue(comment);
    setAddCommentModalVisible(true);
  };

  const submitAddComment = () => {
    setComment(commentInputValue);
    setAddCommentModalVisible(false);
  };

  const handleFeedbackSubmit = () => {
    refFeedbackSheet.current?.close();
    // TODO : send rating, selectedTags, comment to API
  };

  const handleSendMessage = () => {
    navigate('ChatConversation' as any, { chatId: '1' });
  };

  const handleCancelBooking = () => {
    goBack();
  };

  const handleViewPayment = () => {
    refPaymentSheet.current?.open();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ServiceScreenHeader showBack onBackPress={goBack} title="" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map */}
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 6.527,
              longitude: 3.382,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker
              coordinate={ROUTE_COORDS[0]}
              pinColor="#4285F4"
              title="A"
            />
            <Marker
              coordinate={ROUTE_COORDS[ROUTE_COORDS.length - 1]}
              pinColor="#3FA565"
              title="B"
            />
            <Polyline
              coordinates={ROUTE_COORDS}
              strokeColor="#3FA565"
              strokeWidth={4}
            />
          </MapView>
        </View>

        {/* Professional card */}
        <View style={styles.proCard}>
          <Image source={require('../../../Images/logo.png')} style={styles.proAvatar} />
          <View style={styles.proInfo}>
            <Text style={styles.proName}>Mr. Hamid</Text>
            <Text style={styles.proTitle}>Professional</Text>
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>4.8</Text>
            <FontAwesome name="star" size={scale(16)} color="#FFA500" />
          </View>
        </View>

        {/* Service title + status */}
        <View style={styles.titleRow}>
          <Text style={styles.serviceTitle}>Cleaning Service</Text>
          <View style={[styles.statusBadge, isDone && styles.statusBadgeDone]}>
            <Text style={[styles.statusText, isDone && styles.statusTextDone]}>
              {isDone ? 'Done' : 'Accepted'}
            </Text>
          </View>
        </View>

        {/* View payment details */}
        <TouchableOpacity style={styles.paymentRow} onPress={handleViewPayment} activeOpacity={0.7}>
          <Ionicons name="wallet" size={scale(20)} color="#3FA565" />
          <Text style={styles.paymentLabel}>View payment details</Text>
          <Ionicons name="chevron-forward" size={scale(20)} color="#000" />
        </TouchableOpacity>

        {/* Service info list */}
        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <View style={[styles.infoIcon, { backgroundColor: '#4285F4' }]} />
            <Text style={styles.infoLabelPlain}>Road No. 6 Avenue - 05</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={[styles.infoIcon, { backgroundColor: '#3FA565' }]} />
            <Text style={styles.infoLabelPlain}>Moroccan university road</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={scale(18)} color="#333" style={styles.infoIconSpacer} />
            <Text style={styles.infoLabelBlack}>Date: </Text>
            <Text style={styles.infoValueGrey}>12 July 2025</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={scale(18)} color="#333" style={styles.infoIconSpacer} />
            <Text style={styles.infoLabelBlack}>Time: </Text>
            <Text style={styles.infoValueGrey}>10:00 AM-11 AM</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="construct-outline" size={scale(18)} color="#333" style={styles.infoIconSpacer} />
            <Text style={styles.infoLabelBlack}>Services: </Text>
            <Text style={styles.infoValueGrey}>Cleaner</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={scale(18)} color="#333" style={styles.infoIconSpacer} />
            <Text style={styles.infoLabelBlack}>Email: </Text>
            <Text style={styles.infoValueGrey}>example@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={scale(18)} color="#333" style={styles.infoIconSpacer} />
            <Text style={styles.infoLabelBlack}>Phone: </Text>
            <Text style={styles.infoValueGrey}>012562589663</Text>
          </View>
        </View>

        {/* Duration & Distance cards */}
        <View style={styles.summaryRow}>
          {/* Duration */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconWrapper}>
              <Ionicons name="time-outline" size={scale(22)} color="#333" />
            </View>

            <View>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>2h</Text>
            </View>
          </View>

          {/* Distance */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconWrapper}>
              <Ionicons name="location-outline" size={scale(22)} color="#333" />
            </View>

            <View>
              <Text style={styles.summaryLabel}>Distance</Text>
              <Text style={styles.summaryValue}>1.1 Km</Text>
            </View>
          </View>
        </View>

        {/* Action buttons */}
        {isDone ? (
          <TouchableOpacity
            style={styles.rateBtn}
            onPress={() => refFeedbackSheet.current?.open()}
            activeOpacity={0.7}
          >
            <FontAwesome name="star" size={scale(20)} color="#FFA500" />
            <Text style={styles.rateBtnText}>Rate your experience</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.messageBtn} onPress={handleSendMessage} activeOpacity={0.7}>
              <Ionicons name="chatbubble-outline" size={scale(20)} color="#333" />
              <Text style={styles.messageBtnText}>Send message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelBooking} activeOpacity={0.7}>
              <Ionicons name="close" size={scale(22)} color="#fff" />
              <Text style={styles.cancelBtnText}>Cancel Booking</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Service price bottom sheet */}
      <RBSheet
        ref={refPaymentSheet}
        height={scale(600)}
        openDuration={250}
        closeOnPressMask
        customStyles={{
          container: sheetStyles.container,
          wrapper: sheetStyles.wrapper,
        }}
      >
        <View style={sheetStyles.handle} />
        <View style={sheetStyles.headerRow}>
          <View style={sheetStyles.headerSpacer} />
          <Text style={sheetStyles.title}>Service price</Text>
          <TouchableOpacity
            style={sheetStyles.closeBtn}
            onPress={() => refPaymentSheet.current?.close()}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={scale(22)} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={sheetStyles.content}>

          <View style={sheetStyles.section}>
            <View style={sheetStyles.row}>
              <Text style={sheetStyles.rowLabel}>Cleaning</Text>
              <Text style={sheetStyles.rowValue}>₦12.50/h</Text>
            </View>
            <View style={sheetStyles.row}>
              <Text style={sheetStyles.rowLabel}>Booked hours</Text>
              <Text style={sheetStyles.rowValue}>2h</Text>
            </View>
          </View>
          <View style={sheetStyles.divider} />

          <View style={sheetStyles.section}>
            <View style={sheetStyles.row}>
              <Text style={sheetStyles.rowLabel}>Subtotal</Text>
              <Text style={sheetStyles.rowValue}>₦12.50/h</Text>
            </View>
          </View>
          <View style={sheetStyles.divider} />

          <View style={sheetStyles.section}>
            <View style={sheetStyles.row}>
              <Text style={sheetStyles.rowLabel}>Professional's minimum charge</Text>
              <View style={sheetStyles.rowRight}>
                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="information-circle-outline" size={scale(18)} color="#666" />
                </TouchableOpacity>
                <Text style={sheetStyles.rowValueGreen}>+ ₦12.50</Text>
              </View>
            </View>
            <View style={sheetStyles.row}>
              <Text style={sheetStyles.rowLabel}>Management fees</Text>
              <View style={sheetStyles.rowRight}>
                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="information-circle-outline" size={scale(18)} color="#666" />
                </TouchableOpacity>
                <Text style={sheetStyles.rowValueGreen}>+ ₦0.83</Text>
              </View>
            </View>
            <View style={sheetStyles.row}>
              <Text style={sheetStyles.rowLabel}>VAT (heading fee)</Text>
              <View style={sheetStyles.rowRight}>
                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="information-circle-outline" size={scale(18)} color="#666" />
                </TouchableOpacity>
                <Text style={sheetStyles.rowValueGreen}>+ ₦0.17</Text>
              </View>
            </View>
          </View>
          <View style={sheetStyles.divider} />

          <View style={sheetStyles.row}>
            <Text style={sheetStyles.rowLabel}>Price</Text>
            <Text style={sheetStyles.totalValue}>₦37.00</Text>
          </View>

          <View style={sheetStyles.buttonsRow}>
            <TouchableOpacity
              style={sheetStyles.exitBtn}
              onPress={() => refPaymentSheet.current?.close()}
              activeOpacity={0.7}
            >
              <Text style={sheetStyles.exitBtnText}>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sheetStyles.remainBtn}
              onPress={() => refPaymentSheet.current?.close()}
              activeOpacity={0.7}
            >
              <Text style={sheetStyles.remainBtnText}>Remain</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {/* Feedback / Rating bottom sheet - when service is done */}
      <RBSheet
        ref={refFeedbackSheet}
        height={scale(480)}
        openDuration={250}
        closeOnPressMask
        customStyles={{
          container: feedbackSheetStyles.container,
          wrapper: feedbackSheetStyles.wrapper,
        }}
      >
        <View style={feedbackSheetStyles.handle} />
        <View style={feedbackSheetStyles.headerRow}>
          <View style={feedbackSheetStyles.headerSpacer} />
          <Text style={feedbackSheetStyles.sheetTitle}>Excellent</Text>
          <TouchableOpacity
            style={feedbackSheetStyles.closeBtn}
            onPress={() => refFeedbackSheet.current?.close()}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={scale(22)} color="#333" />
          </TouchableOpacity>
        </View>
        <Text style={feedbackSheetStyles.subtitle}>
          You can thank your craftsman with a tip
        </Text>

        {/* Star rating */}
        <View style={feedbackSheetStyles.starsRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setStarRating(i)}
              style={feedbackSheetStyles.starBtn}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={i <= starRating ? 'star' : 'star-o'}
                size={scale(28)}
                color={i <= starRating ? '#FFA500' : '#CCC'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback tags */}
        <View style={feedbackSheetStyles.tagsWrap}>
          {FEEDBACK_TAGS.map((tag) => {
            const selected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                style={[feedbackSheetStyles.tag, selected && feedbackSheetStyles.tagSelected]}
                onPress={() => toggleTag(tag)}
                activeOpacity={0.7}
              >
                <Text style={[feedbackSheetStyles.tagText, selected && feedbackSheetStyles.tagTextSelected]}>
                  {tag}
                </Text>
              </TouchableOpacity>
              // <text> is written here
            );
          })}
        </View>

        {/* Comments row - opens Add a comment modal */}
        <TouchableOpacity
          style={feedbackSheetStyles.commentsRow}
          onPress={openAddCommentModal}
          activeOpacity={0.7}
        >
          <Text
            style={comment ? feedbackSheetStyles.commentsValue : feedbackSheetStyles.commentsPlaceholder}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {comment || 'Comments'}
          </Text>
          <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={feedbackSheetStyles.submitBtn}
          onPress={handleFeedbackSubmit}
          activeOpacity={0.7}
        >
          <Text style={feedbackSheetStyles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </RBSheet>

      {/* Add a comment modal */}
      <Modal
        isVisible={addCommentModalVisible}
        onBackdropPress={() => setAddCommentModalVisible(false)}
        onBackButtonPress={() => setAddCommentModalVisible(false)}
        backdropOpacity={0.5}
        style={addCommentModalStyles.modal}
      >
        <View style={addCommentModalStyles.container}>
          <View style={addCommentModalStyles.headerRow}>
            <Text style={addCommentModalStyles.title}>Add a comment</Text>
            <TouchableOpacity
              style={addCommentModalStyles.closeBtn}
              onPress={() => setAddCommentModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={scale(24)} color="#333" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={addCommentModalStyles.input}
            placeholder="Comments"
            placeholderTextColor="#999"
            value={commentInputValue}
            onChangeText={setCommentInputValue}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={addCommentModalStyles.submitBtn}
            onPress={submitAddComment}
            activeOpacity={0.7}
          >
            <Text style={addCommentModalStyles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: margin.xxxl },
  mapWrapper: {
    marginHorizontal: padding.lg,
    marginBottom: margin.lg,
    borderRadius: 16,
    overflow: 'hidden',
    height: scale(200),
  },
  map: { flex: 1, width: '100%', height: '100%' },
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    marginBottom: margin.lg,
  },
  proAvatar: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    marginRight: padding.md,
  },
  proInfo: { flex: 1 },
  proName: { fontSize: fontSize(17), fontWeight: '700', color: '#000' },
  proTitle: { fontSize: fontSize(13), color: '#666', marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: scale(4) },
  ratingText: { fontSize: fontSize(18), fontWeight: '700', color: '#000' },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    marginBottom: margin.md,
  },
  serviceTitle: { fontSize: fontSize(20), fontWeight: '700', color: '#000' },
  statusBadge: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: 20,
  },
  statusBadgeDone: {
    backgroundColor: '#3FA565',
  },
  statusText: { fontSize: fontSize(13), color: '#555', fontWeight: '500' },
  statusTextDone: { color: '#fff' },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3FA565',
    borderRadius: 12,
    paddingVertical: scale(14),
    marginHorizontal: padding.lg,
    gap: scale(8),
  },
  rateBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#fff' },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: scale(12),
    marginBottom: margin.lg,
    gap: scale(10),
  },
  paymentLabel: { flex: 1, fontSize: fontSize(15), color: '#000' },
  infoList: { paddingHorizontal: padding.lg, marginBottom: margin.lg },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: scale(14) },
  infoIcon: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    marginRight: scale(12),
  },
  infoIconSpacer: { marginRight: scale(12) },
  infoLabelPlain: { fontSize: fontSize(14), color: '#000', flex: 1 },
  infoLabelBlack: { fontSize: fontSize(14), color: '#000' },
  infoValueGrey: { fontSize: fontSize(14), color: '#888' },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    marginBottom: margin.xl,
  },

  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 14,
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    marginHorizontal: scale(5),
  },

  summaryIconWrapper: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#DADADA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },

  summaryLabel: {
    fontSize: fontSize(13),
    color: '#777',
  },

  summaryValue: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
    marginTop: scale(2),
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 12,
    paddingVertical: scale(14),
    marginHorizontal: padding.lg,
    marginBottom: scale(12),
    gap: scale(8),
  },
  messageBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#333' },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53935',
    borderRadius: 12,
    paddingVertical: scale(14),
    marginHorizontal: padding.lg,
    gap: scale(8),
  },
  cancelBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#fff' },
});

const sheetStyles = StyleSheet.create({
  wrapper: { backgroundColor: 'rgba(0,0,0,0.4)' },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    paddingTop: scale(24),
    paddingHorizontal: padding.lg,
    paddingBottom: margin.xl,
  },
  handle: {
    width: scale(40),
    height: scale(4),
    borderRadius: 2,
    backgroundColor: '#CCC',
    alignSelf: 'center',
    marginBottom: scale(8),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: margin.lg,
  },
  headerSpacer: { width: scale(36), height: scale(36) },
  title: {
    flex: 1,
    fontSize: fontSize(22),
    fontWeight: '700',
    color: '#3FA565',
    textAlign: 'center',
  },
  closeBtn: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(18),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#555',
  },
  content: {},
  section: { marginBottom: scale(12) },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(10),
  },
  rowLabel: { fontSize: fontSize(15), color: '#000' },
  rowValue: { fontSize: fontSize(15), color: '#000' },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: scale(6) },
  rowValueGreen: { fontSize: fontSize(15), color: '#000' },
  divider: { height: 1, backgroundColor: '#E8E8E8', marginVertical: scale(4) },
  totalValue: { fontSize: fontSize(20), fontWeight: '700', color: '#000' },
  buttonsRow: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: margin.xl,
  },
  exitBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#3FA565',
    borderRadius: 12,
    paddingVertical: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#3FA565' },
  remainBtn: {
    flex: 1,
    backgroundColor: '#3FA565',
    borderRadius: 12,
    paddingVertical: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  remainBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#fff' },
});

const feedbackSheetStyles = StyleSheet.create({
  wrapper: { backgroundColor: 'rgba(0,0,0,0.4)' },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    paddingTop: scale(16),
    paddingHorizontal: padding.lg,
    paddingBottom: margin.xl,
  },
  handle: {
    width: scale(40),
    height: scale(4),
    borderRadius: 2,
    backgroundColor: '#CCC',
    alignSelf: 'center',
    marginBottom: scale(12),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(4),
  },
  headerSpacer: { width: scale(36), height: scale(36) },
  sheetTitle: {
    flex: 1,
    fontSize: fontSize(24),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  closeBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: fontSize(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: margin.lg,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(8),
    marginBottom: margin.lg,
  },
  starBtn: { padding: scale(4) },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
    marginBottom: margin.lg,
  },
  tag: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  tagSelected: {
    borderColor: '#3FA565',
    backgroundColor: '#3FA565',
  },
  tagText: { fontSize: fontSize(13), color: '#666' },
  tagTextSelected: { fontSize: fontSize(13), color: '#fff', fontWeight: '500' },
  commentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    borderRadius: 12,
    paddingVertical: scale(14),
    paddingHorizontal: padding.md,
    marginBottom: margin.lg,
  },
  commentsPlaceholder: {
    fontSize: fontSize(15),
    color: '#999',
    flex: 1,
  },
  commentsValue: {
    fontSize: fontSize(15),
    color: '#000',
    flex: 1,
  },
  submitBtn: {
    backgroundColor: '#3FA565',
    borderRadius: 12,
    paddingVertical: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#fff' },
});

const addCommentModalStyles = StyleSheet.create({
  modal: { margin: 0, justifyContent: 'center', alignItems: 'center' },
  container: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: padding.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: margin.lg,
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
  },
  closeBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#EDEDED',
    borderRadius: 12,
    paddingVertical: scale(14),
    paddingHorizontal: padding.md,
    fontSize: fontSize(15),
    color: '#000',
    minHeight: scale(100),
    marginBottom: margin.lg,
  },
  submitBtn: {
    backgroundColor: '#3FA565',
    borderRadius: 12,
    paddingVertical: scale(14),
    alignItems: 'center',
  },
  submitBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#fff' },
});
