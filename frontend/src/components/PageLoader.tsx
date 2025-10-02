import { Loader2 } from "lucide-react"; // lightweight spinner icon
import { motion } from "motion/react"; // for smooth fade/scale animation

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </motion.div>
    </div>
  );
}
