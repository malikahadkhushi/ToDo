import SideBar from '../Component/sideBar/page';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className='flex w-full'>
        <SideBar/>
        {children}
        
        </section>
  }