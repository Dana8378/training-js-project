import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div style={{ 
      maxWidth: '1058px', 
      margin: '0 auto', 
      padding: '24px' 
    }}>
      <Outlet />
    </div>
  );
}