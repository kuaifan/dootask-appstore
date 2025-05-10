import type { AppItem } from "@/types/app"

interface AppInstallProps {
    app: AppItem
}

export function AppInstall({app}: AppInstallProps) {
    return (
        <div>
            {JSON.stringify(app)}
        </div>
    )
}
