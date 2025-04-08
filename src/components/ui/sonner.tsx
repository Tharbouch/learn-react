import { useTheme } from "@/hooks/useTheme";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.light]:bg-gray-50 group-[.light]:text-gray-800",
          title: "group-[.light]:text-gray-800 font-medium",
          description: "group-[.light]:text-gray-600 text-sm",
          success:
            "group-[.light]:bg-green-50 group-[.light]:border-green-100 group-[.light]:text-green-800",
          error:
            "group-[.light]:bg-red-50 group-[.light]:border-red-100 group-[.light]:text-red-800",
          info: "group-[.light]:bg-blue-50 group-[.light]:border-blue-100 group-[.light]:text-blue-800",
          warning:
            "group-[.light]:bg-yellow-50 group-[.light]:border-yellow-100 group-[.light]:text-yellow-800",
        },
      }}
      style={
        {
          "--normal-bg": theme === "light" ? "#f8f9fa" : "var(--popover)",
          "--normal-text":
            theme === "light" ? "#1a1a1a" : "var(--popover-foreground)",
          "--normal-border": theme === "light" ? "#e5e7eb" : "var(--border)",
          "--success-bg": theme === "light" ? "#ecfdf5" : undefined,
          "--success-text": theme === "light" ? "#065f46" : undefined,
          "--error-bg": theme === "light" ? "#fef2f2" : undefined,
          "--error-text": theme === "light" ? "#991b1b" : undefined,
          "--info-bg": theme === "light" ? "#eff6ff" : undefined,
          "--info-text": theme === "light" ? "#1e40af" : undefined,
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
