"use client"

import {useTranslations} from 'next-intl';
import {appReady, requestAPI} from "@dootask/tools";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {AppCard} from "@/components/app-card";
import {AppSearch} from "@/components/app-search";
import {ChevronLeft, ChevronRight, RefreshCw, LoaderCircle} from 'lucide-react';
import { useState, useEffect } from 'react';
import {AppItem} from "@/type/app";

export default function Home() {
  const t = useTranslations();
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const [availableCategories, setAvailableCategories] = useState<string[]>(['all']);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 获取应用列表数据
  appReady().then(() => {
    console.log(1);
    fetchApps();
  });

  useEffect(() => {
    console.log(2);
    fetchApps();
  }, [])

  const fetchApps = () => {
    setLoading(true);
    requestAPI({
      url: "apps/list",
    }).then(({data}) => {
      if (data) {
        setApps(data);
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  // 提取应用标签并更新可用类别
  useEffect(() => {
    if (apps.length > 0) {
      // 收集所有应用的标签
      const allTags = apps.flatMap(app => app.info.tags || []);
      // 去重并保留非空标签
      const uniqueTags = [...new Set(allTags)].filter(tag => tag.trim() !== '');
      // 最多保留4个标签（加上'all'总共5个）
      const limitedTags = uniqueTags.slice(0, 4);
      // 始终保留 'all' 作为第一个选项
      const categories = ['all', ...limitedTags];
      setAvailableCategories(categories);

      // 如果当前选中的类别不在新的类别列表中，重置为 'all'
      if (category !== 'all' && !limitedTags.includes(category)) {
        setCategory('all');
      }
    }
  }, [apps, category]);

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

    // 按搜索关键词过滤
    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase().trim();
      filtered = filtered.filter(app => {
        return (
          app.info.name.toLowerCase().includes(keyword) ||
          app.info.description.toLowerCase().includes(keyword) ||
          (app.info.tags && app.info.tags.some(tag => tag.toLowerCase().includes(keyword)))
        );
      });
    }

    return filtered;
  };

  // 处理搜索
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
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
              {loading ? <LoaderCircle className="animate-spin"/> : <RefreshCw/>}
            </Button>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[300px]">
            <AppSearch onSearch={handleSearch}/>
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

        {availableCategories.length > 1 && (
          <Tabs defaultValue="all" className="mb-6" value={category} onValueChange={setCategory}>
            <TabsList className={`flex w-full max-w-md light:bg-gray-100`}>
              {availableCategories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-sm">
                  {cat === 'all' ? t('app.all') : cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {availableCategories.map((tabValue) => (
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
        )}

        {getFilteredApps().length > 0 && (
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
        )}
      </div>
    </main>
  );
}
