export {
  TourRoot as Root,
  TourBackdrop as Backdrop,
  TourSpotlight as Spotlight,
  TourPositioner as Positioner,
  TourContent as Content,
  TourArrow as Arrow,
  TourArrowTip as ArrowTip,
  TourTitle as Title,
  TourDescription as Description,
  TourProgressText as ProgressText,
  TourCloseTrigger as CloseTrigger,
  TourControl as Control,
  TourActionTrigger as ActionTrigger,
} from "./tour"

export type {
  TourRootProps as RootProps,
  TourBackdropProps as BackdropProps,
  TourSpotlightProps as SpotlightProps,
  TourPositionerProps as PositionerProps,
  TourContentProps as ContentProps,
  TourArrowProps as ArrowProps,
  TourArrowTipProps as ArrowTipProps,
  TourTitleProps as TitleProps,
  TourDescriptionProps as DescriptionProps,
  TourProgressTextProps as ProgressTextProps,
  TourCloseTriggerProps as CloseTriggerProps,
  TourControlProps as ControlProps,
  TourActionTriggerProps as ActionTriggerProps,
} from "./tour"

import type { Tour } from "@ark-ui/react/tour"

export type StepAction = Tour.StepAction
export type StepDetails = Tour.StepDetails
export type StatusChangeDetails = Tour.StatusChangeDetails
