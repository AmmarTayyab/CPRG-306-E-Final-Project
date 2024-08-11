interface ExtraObject {
  message?: string;
  type?: string;
  _id: string;
  index?: number;
}

interface ModalBodyProps {
  extraObject?: ExtraObject;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  bodyType: string;
  size: string;
  extraObject: any;
  title: string;
}
 interface OptionsProp{
  id:number;
  name:string
}

export type { ExtraObject, ModalBodyProps, ModalState,OptionsProp };


