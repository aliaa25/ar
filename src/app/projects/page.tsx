'use client';
import useGetProjects from "@/hooks/projects/useGetProjects";
import Image from "next/image";
import { FaPlus, FaTrash, FaEye, FaDownload, FaHome } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import useDeleteProject from "@/hooks/projects/useDeleteProject";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

export default function Projects() {
  const router = useRouter();
  const { data: projects, isLoading, error } = useGetProjects();
  const { mutate: deleteProject } = useDeleteProject();
  const [fullImage, setFullImage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleViewImage = (image: string) => {
    setFullImage(image);
  };

  const handleDownloadImage = (image: string) => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'project-screenshot.png';
    link.click();
  };

  return (
    <div className="bg-mainbackground min-h-screen pb-10 relative">
      {/* Full Page Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center gap-4 text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Loader2 className="animate-spin w-10 h-10 text-white" />
              <p className="text-lg">Loading projects...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner with motion background */}
      <motion.div
        className="relative w-full h-[300px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute w-full h-full"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/3.jpg" alt="Project Banner" fill className="object-cover" />
        </motion.div>
        <motion.div
          className="absolute bottom-6 right-10 text-white text-4xl font-semibold"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Projects
        </motion.div>
      </motion.div>

      {/* Control Bar */}
      <motion.div
        className="bg-white px-8 py-4 flex flex-wrap items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2 bg-mainbackground text-white px-4 py-2 rounded-md cursor-pointer hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/uploadIMG")}
        >
          <FaPlus />
          <span>Add New</span>
        </motion.div>
      </motion.div>

      {/* Latest Designs Section */}
      <div className="bg-white px-8 pt-6 pb-10">
        <h2 className="text-mainbackground font-bold text-lg mb-4">
          Your latest designs
        </h2>

        {error ? (
          <p className="text-red-500">Failed to load projects</p>
        ) : projects?.length === 0 ? (
          <motion.div
            className="text-center text-gray-600 py-24 col-span-full flex flex-col items-center justify-center animate-fade-in"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-6xl mb-6"
            >
              <FaHome className="w-10 h-10 text-mainbackground" />
            </motion.div>
            <motion.p
              className="text-2xl font-bold text-mainbackground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              No projects yet...
            </motion.p>
            <motion.p
              className="text-gray-500 mt-3 max-w-md text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* eslint-disable react/no-unescaped-entities */}
              It looks like you haven't uploaded any designs. Let's start by uploading your first masterpiece!
              {/* eslint-disable react/no-unescaped-entities */}
            </motion.p>
            <motion.button
              onClick={() => router.push("/uploadIMG")}
              className="mt-6 bg-mainbackground hover:bg-[#0b3f32] text-white px-6 py-2 rounded-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Upload Your First Design
            </motion.button>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.projectId}
                className="relative group"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-square relative overflow-hidden rounded-xl shadow-md">
                  <Image
                    src={project.imageBase64}
                    alt="Project Screenshot"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    onClick={() => handleViewImage(project.imageBase64)}
                  />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        title="Delete"
                        onClick={() => setConfirmDeleteId(project.projectId)}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                        className="bg-red-500 hover:bg-red-700"
                          onClick={() => {
                            if (confirmDeleteId) deleteProject(confirmDeleteId);
                            setConfirmDeleteId(null);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <button
                    className="absolute top-2 left-2 bg-blue-600 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={() => handleViewImage(project.imageBase64)}
                    title="View Full Image"
                  >
                    <FaEye className="w-4 h-4" />
                  </button>

                  <button
                    className="absolute bottom-2 right-2 bg-green-600 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={() => handleDownloadImage(project.imageBase64)}
                    title="Download Image"
                  >
                    <FaDownload className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {fullImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullImage(null)}
          >
            <motion.img
              src={fullImage}
              alt="Full View"
              className="max-w-4xl max-h-[80vh] rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
