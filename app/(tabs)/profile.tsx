
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const profileOptions = [
    {
      title: 'My Events',
      description: 'View events you\'re attending',
      icon: 'calendar',
      color: colors.primary,
    },
    {
      title: 'Favorites',
      description: 'Your saved events',
      icon: 'heart.fill',
      color: colors.secondary,
    },
    {
      title: 'Notifications',
      description: 'Manage event notifications',
      icon: 'bell.fill',
      color: colors.accent,
    },
    {
      title: 'Location Settings',
      description: 'Update your location preferences',
      icon: 'location.fill',
      color: colors.primary,
    },
    {
      title: 'Privacy',
      description: 'Privacy and data settings',
      icon: 'lock.fill',
      color: colors.textSecondary,
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'questionmark.circle.fill',
      color: colors.accent,
    },
  ];

  const renderProfileOption = (option: typeof profileOptions[0], index: number) => (
    <Pressable key={index} style={styles.optionCard}>
      <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
        <IconSymbol name={option.icon as any} color={colors.card} size={24} />
      </View>
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{option.title}</Text>
        <Text style={styles.optionDescription}>{option.description}</Text>
      </View>
      <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your account and preferences</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <IconSymbol name="person.fill" color={colors.card} size={40} />
            </View>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
          </View>
        </View>

        <View style={styles.optionsSection}>
          {profileOptions.map(renderProfileOption)}
        </View>

        <Pressable style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  profileSection: {
    marginBottom: 32,
  },
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  optionsSection: {
    marginBottom: 32,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  signOutButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signOutText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
