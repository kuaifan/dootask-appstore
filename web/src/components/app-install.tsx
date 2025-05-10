import type { AppItem } from "@/types/app"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ScrollArea } from "./ui/scroll-area"

interface AppInstallProps {
    app: AppItem
    zIndex: number
}

export function AppInstall({ app, zIndex }: AppInstallProps) {
    const formSchema = z.object({
        name: z.string(),
        version: z.string().min(1, { message: "请选择版本" }),
        cpuLimit: z.string()
            .min(1, { message: "请输入CPU限制" })
            .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
                message: "CPU限制必须大于等于0"
            }),
        memoryLimit: z.string()
            .min(1, { message: "请输入内存限制" })
            .refine((val) => {
                // 转换为小写并移除空格
                const normalized = val.toLowerCase().trim()
                // 检查是否为纯数字
                if (/^\d+$/.test(normalized)) return true
                // 检查是否以 m/mb/g/gb 结尾
                return /^\d+(m|mb|g|gb)$/.test(normalized)
            }, {
                message: "内存限制格式不正确，请输入整数或带单位（MB/GB）"
            }),
        ...app.info.fields.reduce((acc, field) => ({
            ...acc,
            [field.name]: z.string().min(1, { message: `请输入${field.label}` }),
        }), {}),
    })

    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: app.info.name,
            version: "",
            cpuLimit: "",
            memoryLimit: "",
            ...app.info.fields.reduce((acc, field) => ({
                ...acc,
                [field.name]: field.default?.toString() || "",
            }), {}),
        } as FormValues,
    })

    const onSubmit = (values: FormValues) => {
        // 提取 params 字段
        const params = app.info.fields.reduce((acc, field) => ({
            ...acc,
            [field.name]: values[field.name as keyof FormValues],
        }), {})

        // 构建提交数据
        const submitData = {
            version: values.version,
            params,
            resources: {
                cpu_limit: values.cpuLimit,
                memory_limit: values.memoryLimit,
            },
        }

        console.log('提交数据:', submitData)
    }

    return (
        <ScrollArea className="flex-1 h-0">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg font-medium text-foreground/90">基本信息</h3>
                        <div className="flex flex-col gap-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start">
                                        <FormLabel className="sm:text-right min-h-9">名称</FormLabel>
                                        <div className="sm:col-span-3">
                                            <FormControl>
                                                <Input {...field} disabled className="bg-muted" />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="version"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start">
                                        <FormLabel className="sm:text-right min-h-9">版本</FormLabel>
                                        <div className="sm:col-span-3">
                                            <Select onValueChange={field.onChange} defaultValue="latest">
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="选择版本" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent style={{ zIndex: zIndex + 1 }}>
                                                    <SelectItem value="latest">最新版本</SelectItem>
                                                    {app.versions.map((version) => (
                                                        <SelectItem key={version.version} value={version.version}>
                                                            {version.version}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {app.info.fields.length > 0 && (
                        <div className="flex flex-col gap-5">
                            <h3 className="text-lg font-medium text-foreground/90">应用配置</h3>
                            <div className="flex flex-col gap-5">
                                {app.info.fields.map((field) => (
                                    <FormField
                                        key={field.name}
                                        control={form.control}
                                        name={field.name as keyof FormValues}
                                        render={({ field: formField }) => (
                                            <FormItem className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start">
                                                <FormLabel className="sm:text-right min-h-9">{field.label}</FormLabel>
                                                <div className="sm:col-span-3">
                                                    <FormControl>
                                                        <Input
                                                            {...formField}
                                                            type={field.type === "number" ? "number" : "text"}
                                                            placeholder={field.placeholder}
                                                            defaultValue={field.default}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg font-medium text-foreground/90">资源限制</h3>
                        <div className="flex flex-col gap-5">
                            <FormField
                                control={form.control}
                                name="cpuLimit"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start">
                                        <FormLabel className="sm:text-right min-h-9">CPU限制（核心数）</FormLabel>
                                        <div className="sm:col-span-3">
                                            <FormControl>
                                                <Input {...field} placeholder="限制为 0 则关闭限制" />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="memoryLimit"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start">
                                        <FormLabel className="sm:text-right min-h-9">内存限制（MB/GB）</FormLabel>
                                        <div className="sm:col-span-3">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="示例：512MB、1GB，限制为 0 则关闭限制"
                                                    onBlur={(e) => {
                                                        const value = e.target.value.toLowerCase().trim()
                                                        // 如果是0，保持原样
                                                        if (value === '0') return
                                                        
                                                        // 提取数字部分
                                                        const num = parseInt(value)
                                                        if (isNaN(num)) return
                                                        
                                                        // 根据数值大小自动添加单位
                                                        if (num > 0 && num <= 32) {
                                                            field.onChange(`${num}GB`)
                                                        } else if (num > 32) {
                                                            field.onChange(`${num}MB`)
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="w-full sm:w-auto">安装应用</Button>
                    </div>
                </form>
            </Form>
        </ScrollArea>
    )
}
