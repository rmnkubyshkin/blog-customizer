import { useEffect } from "react";

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({isOpen, onClose, rootRef}: TUseClose) {
	useEffect(() => {
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node && // проверяем, что это `DOM`-элемент
				rootRef.current &&
				!rootRef.current.contains(target);  // проверяем, что кликнули на элемент, который находится не внутри нашего блока
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("mousedown", handleClickOutside);
		};

	}, [isOpen, onClose, rootRef]);
}

