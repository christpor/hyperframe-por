export interface DownloadOption {
  id: string;
  platform: string;
  architecture: string;
  format: string;
  actionText: string;
  isComingSoon?: boolean;
  isEnterprise?: boolean;
  url?: string;
}

export const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    id: "mac-arm",
    platform: "macOS",
    architecture: "Apple Silicon",
    format: ".dmg",
    actionText: "Download",
    url: "https://hyperframes.dev/studio/download?os=darwin-arm64",
  },
  {
    id: "mac-x64",
    platform: "macOS",
    architecture: "Intel",
    format: ".dmg",
    actionText: "Download",
    url: "https://hyperframes.dev/studio/download?os=darwin-x64",
  },
  {
    id: "win-x64",
    platform: "Windows",
    architecture: "x64",
    format: ".exe",
    actionText: "Download",
    url: "https://hyperframes.dev/studio/download?os=win-x64",
  },
  {
    id: "win-arm",
    platform: "Windows",
    architecture: "arm64",
    format: ".exe",
    actionText: "Coming soon",
    isComingSoon: true,
  },
  {
    id: "linux-deb",
    platform: "Linux",
    architecture: "x64",
    format: ".deb",
    actionText: "Download",
    url: "https://hyperframes.dev/studio/download?os=linux-deb",
  },
  {
    id: "linux-appimage",
    platform: "Linux",
    architecture: "x64",
    format: "AppImage",
    actionText: "Download",
    url: "https://hyperframes.dev/studio/download?os=linux-appimage",
  },
  {
    id: "enterprise",
    platform: "Enterprise deployment",
    architecture: "Custom cluster",
    format: "Self-hosted",
    actionText: "Contact us",
    isEnterprise: true,
    url: "https://www.heygen.com/contact-us/sales",
  },
];
