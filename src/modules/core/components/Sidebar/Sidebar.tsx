import { Offcanvas } from 'react-bootstrap';
type SidebarProps = {
  isOpen: boolean;
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Sidebar = ({ isOpen, handleClose, title, children }: SidebarProps) => {
  return (
    <Offcanvas show={isOpen} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
