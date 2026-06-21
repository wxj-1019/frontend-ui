import type { Meta, StoryObj } from "@storybook/react";
import { Dock } from "./dock";
import { Home, Settings, User, Mail, Search } from "lucide-react";

const meta: Meta<typeof Dock> = {
  title: "Components/Dock",
  component: Dock,
};

export default meta;
type Story = StoryObj<typeof Dock>;

export const Default: Story = {
  args: {
    items: [
      { icon: <Home size={20} />, label: "Home" },
      { icon: <Search size={20} />, label: "Search" },
      { icon: <Mail size={20} />, label: "Mail" },
      { icon: <User size={20} />, label: "Profile" },
      { icon: <Settings size={20} />, label: "Settings" },
    ],
  },
};
