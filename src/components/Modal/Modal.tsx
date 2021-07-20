import './Modal.css';

import React, { forwardRef, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { PortalWithTheme, usePortalContext } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

const modalPropWidth = ['auto'] as const;
type ModalPropWidth = typeof modalPropWidth[number];
const modalPropWidthDefault: ModalPropWidth = modalPropWidth[0];

const modalPropPosition = ['center', 'top'] as const;
type ModalPropPosition = typeof modalPropPosition[number];
const modalPropPositionDefault: ModalPropPosition = modalPropPosition[0];

type ModalProps = PropsWithHTMLAttributesAndRef<
  {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    hasOverlay?: boolean;
    onOverlayClick?: (event: MouseEvent) => void;
    onClickOutside?: (event: MouseEvent) => void;
    rootClassName?: string;
    width?: ModalPropWidth;
    position?: ModalPropPosition;
    children?: React.ReactNode;
    container?: HTMLDivElement | undefined;
    refsForExcludeClickOutside?: React.RefObject<HTMLElement>[];
  },
  HTMLDivElement
>;

type ModalComponent = (props: ModalProps) => React.ReactElement | null;

const cnModal = cn('Modal');

/**
 * Подписчик на PortalWithThemeProvider
 * получает рефы всех вложенных порталов в модалку
 * для дальнейшего исключения их из useClickOutside
 */
const ContextConsumer: React.FC<{
  onClickOutside?: (event: MouseEvent) => void;
  ignoreClicksInsideRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
}> = ({ onClickOutside, children, ignoreClicksInsideRefs }) => {
  const { refs } = usePortalContext();

  useClickOutside({
    isActive: !!onClickOutside,
    ignoreClicksInsideRefs: [...(ignoreClicksInsideRefs || []), ...(refs || [])],
    handler: (event: MouseEvent) => onClickOutside?.(event),
  });

  return <>{children}</>;
};

export const Modal: ModalComponent = forwardRef((props, ref) => {
  const {
    isOpen,
    onClose,
    onOpen,
    hasOverlay = true,
    onOverlayClick,
    onClickOutside,
    className,
    width = modalPropWidthDefault,
    position = modalPropPositionDefault,
    children,
    container = window.document.body,
    refsForExcludeClickOutside,
    rootClassName,
    ...rest
  } = props;

  const refModal = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen]);

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      appear
      classNames={cnForCssTransition(cnModal)}
      timeout={200}
    >
      <PortalWithTheme
        preset={theme}
        container={container}
        className={cnModal(null, [rootClassName])}
      >
        {hasOverlay && <div className={cnModal('Overlay')} aria-label="Overlay" />}
        <div
          className={cnModal('Window', { width, position }, [className])}
          ref={useForkRef([ref, refModal])}
          {...rest}
        >
          <ContextConsumer
            onClickOutside={onClickOutside || onOverlayClick}
            ignoreClicksInsideRefs={[...(refsForExcludeClickOutside || []), refModal]}
          >
            {children}
          </ContextConsumer>
        </div>
      </PortalWithTheme>
    </CSSTransition>
  );
});
