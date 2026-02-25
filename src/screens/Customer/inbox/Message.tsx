import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { scale, fontSize, padding, margin, borderRadius } from '../../../utils/responsive';
import CustomIcon, { IconNames } from '../../../components/Icon';
import { navigate } from '../../../navigation/navigationService';

interface ChatMessage {
  id: string;
  name: string;
  service: string;
  lastMessage: string;
  time: string;
  avatar: string;
  hasSupport?: boolean;
}

export default function MessageScreen() {
  const [chats] = useState<ChatMessage[]>([
    { id: '1', name: 'YERXON', service: 'Cleaning', lastMessage: 'Cleaning de ester...', time: 'Thursday', avatar: '👤', hasSupport: true },
    { id: '2', name: 'YERXON', service: 'Handyman', lastMessage: 'Need a service', time: '15/6/25', avatar: '👤' },
    { id: '3', name: 'Professional', service: 'Plumbing', lastMessage: 'Thank you for booking', time: '14/5/25', avatar: '👤' },
    { id: '4', name: 'Service Provider', service: 'Electrical', lastMessage: 'Service completed', time: '25/4/24', avatar: '👤' },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.chatList}>
        {chats.map(chat => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatCard}
            onPress={() => navigate('ChatConversation' as any, { chatId: chat.id })}
          >
            <View style={styles.chatLeft}>
              <View style={styles.avatarContainer}>
                <CustomIcon name={IconNames.person} size={fontSize(20)} color="#666" />
              </View>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatService}>{chat.service}</Text>
                <Text style={styles.chatMessage} numberOfLines={1}>{chat.lastMessage}</Text>
              </View>
            </View>
            <View style={styles.chatRight}>
              <Text style={styles.chatTime}>{chat.time}</Text>
              {chat.hasSupport && (
                <TouchableOpacity style={styles.supportButton}>
                  <Text style={styles.supportButtonText}>Support</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: margin.xxxl },
  chatList: { padding: padding.xl },
  chatCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: padding.md, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  chatLeft: { flexDirection: 'row', flex: 1 },
  avatarContainer: { width: scale(50), height: scale(50), borderRadius: scale(25), backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginRight: margin.md },
  chatInfo: { flex: 1 },
  chatName: { fontSize: fontSize(16), fontWeight: 'bold', color: '#000', marginBottom: scale(2) },
  chatService: { fontSize: fontSize(14), color: '#666', marginBottom: scale(4) },
  chatMessage: { fontSize: fontSize(14), color: '#999' },
  chatRight: { alignItems: 'flex-end' },
  chatTime: { fontSize: fontSize(12), color: '#999', marginBottom: margin.xs },
  supportButton: { backgroundColor: '#3FA565', paddingHorizontal: padding.md, paddingVertical: padding.xs, borderRadius: borderRadius.md, marginTop: margin.xs },
  supportButtonText: { fontSize: fontSize(12), color: '#fff', fontWeight: '600' },
});
