import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallbackRef } from "@radix-ui/react-use-callback-ref";
import { useSession } from "@/src/features/auth/SessionProvider";
import { memo, useMemo } from "react";
import { useExperiments } from "@/src/features/experiments/experimentsContext";
import { isHaveAge } from "@/src/shared/lib/age/isHaveAge";
import { ResponsiveContainer } from "@/src/shared/ui/responsive-container/ResponsiveContainer";
import { useResponsiveStyles } from "@/src/shared/lib/responsive/responsiveStyles";
import { useRouter } from "expo-router";

interface PhotoItem {
  id: string;
  image: ImageSourcePropType;
}

const catImages = [
  { id: "0", image: require("../../../assets/images/catProfile/1.jpg") },
  { id: "1", image: require("../../../assets/images/catProfile/2.webp") },
  { id: "2", image: require("../../../assets/images/catProfile/3.jpg") },
  { id: "3", image: require("../../../assets/images/catProfile/4.jpg") },
];

export const UserPage = memo(() => {
  const { logout, userData } = useSession();
  const { experiments } = useExperiments();
  const { isDesktop, dimensions, breakpoints } = useResponsiveStyles();
  const router = useRouter();
  
  // Determine column count based on screen size
  const columnsCount = useMemo(() => {
    const width = dimensions.width;
    if (width >= breakpoints.xl) return 5;
    if (width >= breakpoints.lg) return 4;
    if (width >= breakpoints.md) return 3;
    return 3;
  }, [dimensions.width, breakpoints]);
  
  const isLargeScreen = dimensions.width >= breakpoints.lg;
  const containerMaxWidth = isLargeScreen ? 960 : 1200;
  const itemSize = Math.min(dimensions.width, containerMaxWidth) / columnsCount;

  const handleLogout = useCallbackRef(() => {
    logout();
  });

  const handleEditProfile = useCallbackRef(() => {
    router.push("/edit");
  });

  const renderGalleryItem = ({ item }: { item: PhotoItem }) => (
    <TouchableOpacity 
      style={[
        styles.galleryItem, 
        { width: itemSize, height: itemSize }
      ]}
    >
      <Image
        source={item.image}
        contentFit="cover"
        style={styles.galleryImage}
      />
    </TouchableOpacity>
  );

  const profileContent = useMemo(() => {
    if (!experiments.flags.age.enabled || !userData) {
      return "UwU";
    }

    const age = userData.age || null;
    if (!isHaveAge(age)) {
      return "UwU";
    }

    if (age >= experiments.flags.age.oldFrom) {
      return "Ты старый котик";
    } else {
      return "Ты молоденький котик";
    }
  }, [experiments.flags.age.enabled, experiments.flags.age.oldFrom, userData]);

  const renderContent = () => {
    return (
      <FlatList
        key={`gallery-columns-${columnsCount}`}
        data={catImages}
        renderItem={renderGalleryItem}
        keyExtractor={(item) => item.id}
        numColumns={columnsCount}
        contentContainerStyle={styles.galleryContainer}
      />
    );
  };

  const statsContent = useMemo(() => {
    return (
      <View style={[styles.statsContainer, isDesktop && styles.desktopStatsContainer]}>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, isDesktop && styles.desktopText]}>42</Text>
        <Text style={[styles.statLabel, isDesktop && styles.desktopSmallText]}>Постов</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, isDesktop && styles.desktopText]}>567</Text>
        <Text style={[styles.statLabel, isDesktop && styles.desktopSmallText]}>Подписчиков</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, isDesktop && styles.desktopText]}>890</Text>
        <Text style={[styles.statLabel, isDesktop && styles.desktopSmallText]}>Лайков</Text>
      </View>
    </View>
    )
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ResponsiveContainer style={
        isLargeScreen 
          ? { ...styles.responsiveContainer, maxWidth: containerMaxWidth }
          : styles.responsiveContainer
      }>
        <View style={styles.headerWrapper}>
          <View style={[styles.header, isDesktop && styles.desktopHeader]}>
            <View style={styles.profileSection}>
              <Image
                source={require("../../../assets/images/profile.gif")}
                style={[styles.avatar, isDesktop && styles.desktopAvatar]}
              />
              <View style={styles.nameSection}>
                <Text style={[styles.username, isDesktop && styles.desktopText]}>
                  {userData?.name || "🐱 Neko"}
                </Text>
                <Text style={[styles.bio, isDesktop && styles.desktopSmallText]}>
                  {profileContent}
                </Text>
                {isDesktop && (
                  <TouchableOpacity 
                    style={styles.editProfileButton}
                    onPress={handleEditProfile}
                  >
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {isDesktop && statsContent}
            </View>

          <View style={[styles.headerActions, isDesktop && {justifyContent: 'flex-end'}]}>
            {!isDesktop && statsContent}
            <TouchableOpacity 
              style={styles.logoutButton} 
              hitSlop={5} 
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={24} color="black" />
              {isDesktop && <Text style={styles.logoutText}>Logout</Text>}
            </TouchableOpacity>
          </View>
        </View>

        {!isDesktop && (
          <View style={styles.profileInfo}>
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.contentContainer}>{renderContent()}</View>
      </ResponsiveContainer>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  responsiveContainer: {
    alignItems: 'center',
  },
  headerWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    marginBottom: 10,
  },
  header: {
    width: '100%',
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  desktopHeader: {
    marginBottom: 30,
    paddingTop: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameSection: {
    marginLeft: 20,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  desktopAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  desktopStatsContainer: {
    marginLeft: 40,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  desktopText: {
    fontSize: 22,
  },
  desktopSmallText: {
    fontSize: 16,
  },
  profileInfo: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  galleryContainer: {
    gap: 2,
  },
  galleryItem: {
    margin: 1,
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "grey",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  editProfileText: {
    fontWeight: '600',
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  logoutText: {
    marginLeft: 5,
    fontWeight: '500',
  },
});
