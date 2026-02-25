import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from '@react-navigation/native';
import { goBack } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button } from '../../components';
import CustomIcon, { IconNames } from '../../components/Icon';

type ChatConversationRouteProp = RouteProp<{ params: { chatId?: string } }, 'params'>;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  time: string;
}

export default function ChatConversationScreen() {
  const route = useRoute<ChatConversationRouteProp>();
  const [message, setMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);

  const [messages] = useState<Message[]>([
    { id: '1', text: 'Need a service', sender: 'user', time: '12:44' },
    { id: '2', text: 'Need a service', sender: 'user', time: '12:44' },
    { id: '3', text: 'Need a service', sender: 'user', time: '12:44' },
    { id: '4', text: 'Hello! How can I help you?', sender: 'other', time: '12:44' },
  ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <CustomIcon name={IconNames.arrowBack} size={fontSize(24)} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <CustomIcon name={IconNames.person} size={fontSize(20)} color="#666" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Yeroxon</Text>
            <Text style={styles.headerService}>Cleaning</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <CustomIcon name={IconNames.menu} size={fontSize(24)} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Service Banner */}
      <View style={styles.serviceBanner}>
        <Text style={styles.serviceBannerText}>Service completed:</Text>
        <Text style={styles.serviceBannerTime}>Thursday 09/10 - 12:25 - 15:15</Text>
        <View style={styles.serviceButtons}>
          <TouchableOpacity style={styles.serviceButtonPrimary}>
            <CustomIcon name={IconNames.calendar} size={fontSize(16)} color="#fff" />
            <Text style={styles.serviceButtonTextPrimary}>Book again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <CustomIcon name={IconNames.home} size={fontSize(16)} color="#666" />
            <Text style={styles.serviceButtonText}>Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <CustomIcon name={IconNames.share} size={fontSize(16)} color="#666" />
            <Text style={styles.serviceButtonText}>Share profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages Area */}
      <ScrollView 
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imagePlaceholder}>
          <CustomIcon name="person" size={fontSize(60)} color="#999" />
        </View>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userMessage : styles.otherMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.sender === 'user' && styles.userMessageText,
              ]}
            >
              {msg.text}
            </Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Attachment Options */}
      {showAttachments && (
        <View style={styles.attachmentOptions}>
          <TouchableOpacity style={styles.attachmentOption}>
            <CustomIcon name={IconNames.camera} size={fontSize(24)} color="#666" />
            <Text style={styles.attachmentText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attachmentOption}>
            <CustomIcon name={IconNames.image} size={fontSize(24)} color="#666" />
            <Text style={styles.attachmentText}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attachmentOption}>
            <CustomIcon name={IconNames.document} size={fontSize(24)} color="#666" />
            <Text style={styles.attachmentText}>Files</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.attachButton}
          onPress={() => setShowAttachments(!showAttachments)}
        >
          <CustomIcon name={IconNames.plus} size={fontSize(24)} color="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <CustomIcon name={IconNames.send} size={fontSize(20)} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: padding.sm,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: margin.md,
  },
  headerAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: margin.sm,
  },
  headerAvatarText: {
    fontSize: fontSize(20),
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
    color: '#000',
  },
  headerService: {
    fontSize: fontSize(14),
    color: '#666',
  },
  menuButton: {
    padding: padding.sm,
  },
  menuIcon: {
    fontSize: fontSize(24),
    color: '#000',
  },
  serviceBanner: {
    backgroundColor: '#F5F5F5',
    padding: padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  serviceBannerText: {
    fontSize: fontSize(14),
    color: '#666',
    marginBottom: margin.xs,
  },
  serviceBannerTime: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
    color: '#3FA565',
    marginBottom: margin.md,
  },
  serviceButtons: {
    flexDirection: 'row',
    gap: margin.sm,
  },
  serviceButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3FA565',
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    borderRadius: borderRadius.md,
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    borderRadius: borderRadius.md,
  },
  serviceButtonTextPrimary: {
    fontSize: fontSize(12),
    color: '#fff',
    fontWeight: '600',
  },
  serviceButtonText: {
    fontSize: fontSize(12),
    color: '#666',
    fontWeight: '600',
  },
  messagesContainer: {
    padding: padding.xl,
    paddingBottom: margin.xl,
  },
  imagePlaceholder: {
    width: '100%',
    height: scale(150),
    backgroundColor: '#F5F5F5',
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: margin.lg,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: padding.md,
    borderRadius: borderRadius.md,
    marginBottom: margin.sm,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E0E0E0',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
  },
  messageText: {
    fontSize: fontSize(14),
    color: '#000',
    marginBottom: scale(4),
  },
  userMessageText: {
    color: '#000',
  },
  messageTime: {
    fontSize: fontSize(10),
    color: '#999',
    alignSelf: 'flex-end',
  },
  attachmentOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: padding.md,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  attachmentOption: {
    alignItems: 'center',
    marginHorizontal: margin.lg,
  },
  attachmentText: {
    fontSize: fontSize(12),
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  attachButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: margin.sm,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: borderRadius.lg,
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    fontSize: fontSize(14),
    maxHeight: scale(100),
  },
  sendButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#3FA565',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: margin.sm,
  },
  sendIcon: {
    fontSize: fontSize(20),
  },
});
