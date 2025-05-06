import { IconTypeLucideProps } from "@/interfaces/icon/icon-type-lucide-props";

interface ModalDialogProps {
  buttonTrigger: {
    text: string;
    icon?: IconTypeLucideProps;
  };
  modalArgs?: {
    title: string;
    description: string;
    primaryActionButton?: {
      text: string;
      icon?: IconTypeLucideProps;
      onClick?: () => void | Promise<void>;
    };
    secondaryActionButton?: {
      text: string;
      icon?: IconTypeLucideProps;
      onClick?: () => void | Promise<void>;
    };
  };
}

export type { ModalDialogProps };
