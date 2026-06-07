/* Barrel export for BHB components.
 *
 * Populated by `component-from-figma` as each component is added.
 * Naming convention: BEM-style with `bhb-` prefix
 * (e.g. .bhb-button, .bhb-button--primary, .bhb-button__label).
 */

export { Button } from './Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button/Button';

export { Input } from './Input/Input';
export type { InputProps } from './Input/Input';

export { InputWithIcon } from './InputWithIcon/InputWithIcon';
export type { InputWithIconProps } from './InputWithIcon/InputWithIcon';

export { Textarea } from './Textarea/Textarea';
export type { TextareaProps } from './Textarea/Textarea';

export { Select } from './Select/Select';
export type { SelectProps, SelectOption } from './Select/Select';

export { DatePicker } from './DatePicker/DatePicker';
export type { DatePickerProps } from './DatePicker/DatePicker';

export { Checkbox } from './Checkbox/Checkbox';
export type { CheckboxProps } from './Checkbox/Checkbox';

export { RadioButton } from './RadioButton/RadioButton';
export type { RadioButtonProps } from './RadioButton/RadioButton';

export { Sidebar } from './Sidebar/Sidebar';
export type { SidebarProps, SidebarItem, SidebarSection } from './Sidebar/Sidebar';

export { Footer } from './Footer/Footer';
export type { FooterProps, FooterLink } from './Footer/Footer';

export { Layout } from './Layout/Layout';
export type { LayoutProps } from './Layout/Layout';

export { Message } from './Message/Message';
export type { MessageProps, MessageType, MessagePosition } from './Message/Message';

export { Tooltip } from './Tooltip/Tooltip';
export type { TooltipProps, TooltipPlacement } from './Tooltip/Tooltip';

export { Logo } from './Logo/Logo';
export type { LogoProps } from './Logo/Logo';

export {
  // Sidebar / nav icons
  HomeIcon,
  FileInvoiceIcon,
  FilePlusIcon,
  ExchangeIcon,
  ColumnsIcon,
  IndustryIcon,
  ClipboardListIcon,
  AnalyticsIcon,
  BellIcon,
  QuestionCircleIcon,
  CogIcon,
  // Common UI icons
  CheckIcon,
  CheckCircleIcon,
  TimesIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
  ArrowLeftIcon,
  SyncIcon,
  RedoIcon,
  ListIcon,
  LockIcon,
  LightbulbIcon,
  CommentIcon,
  CutIcon,
  EraserIcon,
  FileIcon,
  FileTimesIcon,
  TruckIcon,
  LandmarkIcon,
  // Action / popup-footer icons (24×24)
  ShieldCheckIcon,
  CommentCheckIcon,
  FilePdfIcon,
  FileCodeIcon,
  HandHoldingUsdIcon,
  MoneyBillWaveIcon,
} from './icons/icons';
export type { IconProps } from './icons/icons';
