import {useTranslations} from 'next-intl';
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {AppCard} from "@/components/app-card";
import {Search} from "@/components/search";
import Image from "next/image";

export default function Home() {
  const t = useTranslations('Home');
  return (
    <main className="min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-2">{t('title')}</h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="relative w-[18px] h-[18px]">
                <Image src="/icons/refresh.svg" alt="刷新" fill/>
              </div>
            </Button>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[300px]">
            <Search/>
          </div>
        </div>

        <div className="flex gap-x-4 mb-6">
          <Button variant="ghost" className="px-4 py-2 text-sm bg-gray-100 rounded-full">全部</Button>
          <Button variant="ghost" className="px-4 py-2 text-sm rounded-full">已安装</Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-5 max-w-md bg-gray-100 p-1">
            <TabsTrigger value="all" className="text-sm">全部</TabsTrigger>
            <TabsTrigger value="database" className="text-sm">Database</TabsTrigger>
            <TabsTrigger value="oss" className="text-sm">Oss</TabsTrigger>
            <TabsTrigger value="tool" className="text-sm">Tool</TabsTrigger>
            <TabsTrigger value="note" className="text-sm">Note</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="Nginx"
                description="Nginx is a web server and a reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols, with a strong f..."
                status="已安装"
                category={["Tool", "Web Server"]}
              />
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="Redis"
                description="Redis is an in-memory data structure store, used as a database, cache and message broker."
                status="已安装"
                category="Database"
              />
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="DooAlioss"
                description="DooAliOss is a plugin for DooTask to support AliOss storage. Note: This is a local image."
                status="安装"
                category="Oss"
              />
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="DooT x COS"
                description="DooT/COS is a plugin for DooTask to support AliOss storage. Note: This is a local image."
                status="安装"
                category="Oss"
              />
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="DooQiNiu"
                description="DooQiNiu is a plugin for DooTask to support Alioss storage. Note: This is a local image."
                status="安装"
                category="Oss"
              />
            </div>
          </TabsContent>

          <TabsContent value="database" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="Redis"
                description="Redis is an in-memory data structure store, used as a database, cache and message broker."
                status="已安装"
                category="Database"
              />
            </div>
          </TabsContent>

          <TabsContent value="oss" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="DooAlioss"
                description="DooAliOss is a plugin for DooTask to support AliOss storage. Note: This is a local image."
                status="安装"
                category="Oss"
              />
            </div>
          </TabsContent>

          <TabsContent value="tool" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="Nginx"
                description="Nginx is a web server and a reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols, with a strong f..."
                status="已安装"
                category="Tool"
              />
            </div>
          </TabsContent>

          <TabsContent value="note" className="mt-6">
            <div className="empty-content text-center py-10 text-gray-500">
              <p>暂无应用</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
          <div>共5条</div>
          <div className="flex items-center gap-x-2">
            <Button variant="outline" size="icon" className="w-7 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Button>
            <span>1</span>
            <span>/</span>
            <span>1</span>
            <span>页</span>
            <Button variant="outline" size="icon" className="w-7 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
