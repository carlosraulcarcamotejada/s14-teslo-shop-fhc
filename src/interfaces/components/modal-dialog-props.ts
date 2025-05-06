import { IconTypeLucideProps } from "@/interfaces/icon/icon-type-lucide-props";
import { ClassValue } from "clsx";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
type ActionButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface ActionButton extends VariantProps<typeof buttonVariants> {
  className?: ClassValue;
  icon?: IconTypeLucideProps;
  onClick?: () => void | Promise<void>;
  text?: string;
}

interface ModalDialogProps {
  buttonTrigger: Omit<ActionButton, "onClick">;
  modalArgs?: {
    description?: string;
    title?: string;
    primaryActionButton?: ActionButton;
    secondaryActionButton?: ActionButton;
  };
}

export type { ModalDialogProps };
export type { ActionButtonVariant };
