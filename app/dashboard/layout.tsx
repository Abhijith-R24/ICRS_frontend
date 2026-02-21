import { Drawer } from "expo-router/drawer";

export default function DashboardLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // ❗ important (we use custom header)
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ title: "Dashboard" }}
      />

      <Drawer.Screen
        name="settings/index"
        options={{ title: "Settings" }}
      />

      <Drawer.Screen
        name="settings/profile"
        options={{ title: "Profile" }}
      />

      <Drawer.Screen
        name="settings/logout"
        options={{ title: "Logout" }}
      />
    </Drawer>
  );
}