"use client"

import {useTranslations} from 'next-intl';
import {appReady, requestAPI} from "@dootask/tools";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {AppCard} from "@/components/app-card";
import {AppSearch} from "@/components/app-search";
import {ChevronLeft, ChevronRight, RefreshCw} from 'lucide-react';
import { useState, useEffect } from 'react';
// 定义应用列表数据类型接口
interface AppField {
  name: string;
  type: string;
  default: string | number;
  label: string;
  placeholder: string;
}

interface RequireUninstall {
  version: string;
  operator: string;
  reason: string;
}

interface AppInfo {
  name: string;
  description: string;
  tags: string[];
  icon: string;
  author: string;
  website: string;
  github: string;
  document: string;
  fields: AppField[];
  require_uninstalls: RequireUninstall[];
}

interface AppLocal {
  installed_at: string;
  installed_num: number;
  installed_version: string;
  status: string;
  params: Record<string, string | number>;
  resources: {
    cpu_limit: string;
    memory_limit: string;
  };
  uninstalled_at?: string;
}

interface AppVersion {
  version: string;
  path: string;
  base_dir: string;
  compose_file: string;
}

interface AppItem {
  name: string;
  info: AppInfo;
  local: AppLocal;
  versions: AppVersion[];
}

export default function Home() {
  const t = useTranslations();
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' 或 'installed'
  const [category, setCategory] = useState('all');

  // 获取应用列表数据
  appReady().then(() => {
    fetchApps();
  });

  const fetchApps = () => {
    setLoading(true);
    requestAPI({
      url: "apps/list",
    }).then(({data}) => {
      if (data) {
        setApps(data);
      }
    }).catch(() => {
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setApps([
      {
        "name": "MysqlExposePort",
        "info": {
          "name": "MysqlExposePort",
          "description": "暴露mysql端口",
          "tags": [],
          "icon": "http://127.0.0.1:2222/uploads/file/apps/MysqlExposePort/logo.png",
          "author": "DooTask",
          "website": "https://www.dootask.com",
          "github": "",
          "document": "",
          "fields": [
            {
              "name": "PROXY_PORT",
              "type": "number",
              "default": 3306,
              "label": "代理端口",
              "placeholder": "代理端口"
            }
          ],
          "require_uninstalls": []
        },
        "local": {
          "installed_at": "2025-05-09 00:56:13",
          "installed_num": 3,
          "installed_version": "1.0.0",
          "status": "installed",
          "params": {
            "PROXY_PORT": 33062,
            "DOOTASK_VERSION": "0.47.7"
          },
          "resources": {
            "cpu_limit": "",
            "memory_limit": ""
          },
        },
        "versions": [
          {
            "version": "1.0.0",
            "path": "/var/www/docker/apps/MysqlExposePort/1.0.0",
            "base_dir": "/var/www/docker/apps/MysqlExposePort",
            "compose_file": "/var/www/docker/apps/MysqlExposePort/1.0.0/docker-compose.yml"
          }
        ]
      },
      {
        "name": "OKR",
        "info": {
          "name": "OKR",
          "description": "一款帮助团队高效设定、跟踪和实现目标与关键结果的工具，让目标管理变得简单透明。",
          "tags": [],
          "icon": "http://127.0.0.1:2222/uploads/file/apps/OKR/logo.svg",
          "author": "DooTask",
          "website": "https://www.dootask.com",
          "github": "",
          "document": "",
          "fields": [],
          "require_uninstalls": [
            {
              "version": "2.0.0",
              "operator": "=",
              "reason": "数据库结构变更"
            },
            {
              "version": "3.0.0",
              "operator": ">=",
              "reason": "架构重大改变"
            }
          ]
        },
        "local": {
          "installed_at": "2025-05-09 00:52:13",
          "installed_num": 12,
          "installed_version": "0.5.0",
          "status": "installed",
          "params": {
            "DOOTASK_VERSION": "0.47.7"
          },
          "resources": {
            "cpu_limit": "",
            "memory_limit": ""
          },
          "uninstalled_at": "2025-05-09 00:51:46"
        },
        "versions": [
          {
            "version": "0.5.0",
            "path": "/var/www/docker/apps/OKR/0.5.0",
            "base_dir": "/var/www/docker/apps/OKR",
            "compose_file": "/var/www/docker/apps/OKR/0.5.0/docker-compose.yml"
          }
        ]
      },
      {
        "name": "appstore",
        "info": {
          "name": "应用商店",
          "description": "官方应用商店",
          "tags": [
            "Tool",
            "Application"
          ],
          "icon": "http://127.0.0.1:2222/uploads/file/apps/appstore/logo.svg",
          "author": "DooTask",
          "website": "https://www.dootask.com",
          "github": "",
          "document": "",
          "fields": [],
          "require_uninstalls": []
        },
        "local": {
          "installed_at": "",
          "installed_num": 0,
          "installed_version": "",
          "status": "not_installed",
          "params": {
            "DOOTASK_VERSION": "0.47.7"
          },
          "resources": {
            "cpu_limit": "",
            "memory_limit": ""
          }
        },
        "versions": [
          {
            "version": "1.0.0",
            "path": "/var/www/docker/apps/appstore/1.0.0",
            "base_dir": "/var/www/docker/apps/appstore",
            "compose_file": "/var/www/docker/apps/appstore/1.0.0/docker-compose.yml"
          }
        ]
      }
    ])
    setLoading(false);
  }, [])

  // 过滤应用列表
  const getFilteredApps = () => {
    let filtered = [...apps];

    // 按安装状态过滤
    if (filter === 'installed') {
      filtered = filtered.filter(app => app.local.status === 'installed');
    }

    // 按类别过滤
    if (category !== 'all') {
      filtered = filtered.filter(app => {
        const tags = app.info.tags || [];
        return tags.some(tag => tag.toLowerCase() === category.toLowerCase());
      });
    }

    return filtered;
  };

  // 刷新应用列表
  const handleRefresh = () => {
    fetchApps();
  };

  return (
    <main className="min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-2">{t('common.title')}</h1>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={handleRefresh}>
              <RefreshCw/>
            </Button>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[300px]">
            <AppSearch/>
          </div>
        </div>

        <div className="flex gap-x-4 mb-6">
          <Button
            variant={filter === 'all' ? "secondary" : "ghost"}
            className="px-4 py-2 text-sm rounded-full"
            onClick={() => setFilter('all')}>
            {t('app.all')}
          </Button>
          <Button
            variant={filter === 'installed' ? "secondary" : "ghost"}
            className="px-4 py-2 text-sm rounded-full"
            onClick={() => setFilter('installed')}>
            {t('app.installed')}
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6" value={category} onValueChange={setCategory}>
          <TabsList className="grid w-full grid-cols-5 max-w-md light:bg-gray-100">
            <TabsTrigger value="all" className="text-sm">{t('app.all')}</TabsTrigger>
            <TabsTrigger value="database" className="text-sm">{t('categories.database')}</TabsTrigger>
            <TabsTrigger value="oss" className="text-sm">{t('categories.oss')}</TabsTrigger>
            <TabsTrigger value="tool" className="text-sm">{t('categories.tool')}</TabsTrigger>
            <TabsTrigger value="note" className="text-sm">{t('categories.note')}</TabsTrigger>
          </TabsList>

          {['all', 'database', 'oss', 'tool', 'note'].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="mt-6">
              {loading ? (
                <div className="text-center py-10">
                  <p>{t('app.loading')}</p>
                </div>
              ) : getFilteredApps().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredApps().map((app) => (
                    <AppCard
                      key={app.name}
                      icon={app.info.icon}
                      title={app.info.name}
                      description={app.info.description}
                      status={app.local.status}
                      category={app.info.tags?.length ? app.info.tags : []}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-content text-center py-10 text-gray-500">
                  <p>{t('app.noApps')}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
          <div>{t('app.totalItems', { count: getFilteredApps().length })}</div>
          <div className="flex items-center gap-x-2">
            <Button variant="outline" size="icon" className="w-7 h-7">
              <ChevronLeft />
            </Button>
            <span>1</span>
            <span>/</span>
            <span>1</span>
            <span>{t('app.page')}</span>
            <Button variant="outline" size="icon" className="w-7 h-7">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
