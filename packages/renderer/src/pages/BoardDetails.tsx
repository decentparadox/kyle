import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { type Storyboard, type Scene } from "../types";
import { getStoryboardById, saveStoryboard } from "../utils/storage";
import Transition from "../components/Transistion";
import { getAllStoryboards } from "../utils/storage";
import { debounce } from "lodash";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import {
  Film,
  MapPin,
  Users,
  Plus,
  Clock,
  PanelLeftDashed,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import useMeasure from "react-use-measure";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ScrollArea } from "../components/ui/scroll-area";
import { cn } from "../lib/utils";
import { DockMenu } from "../components/DockMenu";
type SelectItemProps = {
  value: string;
  label: string;
};

export default function BoardDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [characterOptions, setCharacterOptions] = useState<SelectItemProps[]>(
    []
  );
  const [locationOptions, setLocationOptions] = useState<SelectItemProps[]>([]);
  const [isCreateCharacterDialogOpen, setIsCreateCharacterDialogOpen] =
    useState(false);
  const [isCreateLocationDialogOpen, setIsCreateLocationDialogOpen] =
    useState(false);
  const [newCharacterName, setNewCharacterName] = useState("");
  const [newCharacterDescription, setNewCharacterDescription] = useState("");
  const [newLocationName, setNewLocationName] = useState("");
  const [newLocationDescription, setNewLocationDescription] = useState("");
  const storyboards = getAllStoryboards();

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, { height: heightContent }] = useMeasure();

  const handleSetActiveIdx = useCallback(
    (idx: number) => {
      if (activeIdx < 0) setActiveIdx(0);
      if (activeIdx >= 3) setActiveIdx(2);

      const direction = idx > activeIdx ? 1 : -1;
      setDirection(direction);
      setActiveIdx(idx);
    },
    [activeIdx]
  );

  const variants: Variants = {
    initial: (direction: number) => ({
      opacity: 0,
      height: heightContent > 0 ? heightContent : "auto",
      position: "absolute",
      x: direction > 0 ? 370 : -370,
    }),
    animate: {
      opacity: 1,
      height: heightContent > 0 ? heightContent : "auto",
      position: "relative",
      x: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      x: direction < 0 ? 370 : -370,
      top: 0,
      width: "100%",
    }),
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (id) {
      const board = getStoryboardById(id);
      if (board) {
        setStoryboard(board);
        setActiveSceneId(board.scenes[0].id);
        let updatedCharacters = board.characters ? [...board.characters] : [];

        console.log(updatedCharacters);
        const characterMappedOptions: SelectItemProps[] = updatedCharacters.map(
          (character) => ({
            value: character,
            label: character,
          })
        );

        setCharacterOptions(characterMappedOptions);

        let updatedLocations = board.locations ? [...board.locations] : [];

        const locationMappedOptions: SelectItemProps[] = updatedLocations.map(
          (character) => ({
            value: character,
            label: character,
          })
        );
        setLocationOptions(locationMappedOptions);
      }
    }
  }, [id]);

  const handleSceneUpdate = (updatedScene: Scene) => {
    if (!storyboard) return;

    const updatedScenes = storyboard.scenes.map((scene) =>
      scene.id === updatedScene.id ? updatedScene : scene
    );

    // const updatedBoard = {
    //   ...storyboard,
    //   scenes: updatedScenes,
    //   updatedAt: new Date().toISOString(),
    // };
    let updatedCharacters = storyboard.characters
      ? [...storyboard.characters]
      : [];

    if (updatedScene.characters && updatedScene.characters.length > 0) {
      updatedScene.characters.forEach((char) => {
        if (updatedCharacters && !updatedCharacters.includes(char)) {
          updatedCharacters = [...updatedCharacters, char];
        }
      });
    }

    let updatedLocations = storyboard.locations
      ? [...storyboard.locations]
      : [];

    // Update storyboard characters and locations

    if (
      updatedScene.location &&
      !updatedLocations.includes(updatedScene.location)
    ) {
      updatedLocations = [...updatedLocations, updatedScene.location];
    }

    const updatedBoard = {
      ...storyboard,
      scenes: updatedScenes,
      updatedAt: new Date().toISOString(),
    };

    setStoryboard(updatedBoard);
    saveStoryboard(updatedBoard);
  };

  const DescriptionTiptap = ({ text }: { text: string }) => {
    const handleDebouncedSceneUpdate = debounce(
      ({ editor }: { editor: any }) => {
        const updatedText = editor.getText();
        if (activeScene) {
          handleSceneUpdate({ ...activeScene, description: updatedText });
        }
      },
      10000
    );

    const editor = useEditor({
      extensions: [StarterKit],
      content: text,
      onUpdate: ({ editor }) => {
        handleDebouncedSceneUpdate({ editor });
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
        },
      },
    });

    return <EditorContent editor={editor} className="border-none ring-0" />;
  };

  const NotesTiptap = ({ text }: { text: string }) => {
    const handleDebouncedSceneUpdate = debounce(
      ({ editor }: { editor: any }) => {
        const updatedText = editor.getText();
        if (activeScene) {
          handleSceneUpdate({ ...activeScene, notes: updatedText });
        }
      },
      10000
    );

    const editor = useEditor({
      extensions: [StarterKit],
      content: text,
      onUpdate: ({ editor }) => {
        handleDebouncedSceneUpdate({ editor });
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
        },
      },
    });

    return <EditorContent editor={editor} className="border-none ring-0" />;
  };
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const cameraAngleOptions: SelectItemProps[] = [
    { value: "wide", label: "Wide Shot" },
    { value: "medium", label: "Medium Shot" },
    { value: "close", label: "Close Up" },
    { value: "extreme-close", label: "Extreme Close Up" },
    { value: "over-shoulder", label: "Over the Shoulder" },
    { value: "low-angle", label: "Low Angle" },
    { value: "high-angle", label: "High Angle" },
    { value: "dutch-angle", label: "Dutch Angle" },
    { value: "bird-eye", label: "Bird's Eye View" },
    { value: "point-of-view", label: "Point of View" }
  ];

  const timeOfDayOptions: SelectItemProps[] = [
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
  ];

  const durationOptions: SelectItemProps[] = [
    { value: "30s", label: "30s" },
    { value: "1m", label: "1m" },
    { value: "2m", label: "2m" },
  ];
  const handleAddScene = () => {
    if (!storyboard) return;

    const newScene: Scene = {
      id: uuidv4(),
      title: `Scene ${storyboard.scenes.length + 1}`,
      description: "",
      notes: "",
      characters: [],
      location: "",
      duration: "",
      timeOfDay: "",
      cameraAngle: "",
      order: storyboard.scenes.length,
      createdAt: new Date().toISOString(),
    };

    const updatedBoard = {
      ...storyboard,
      scenes: [...storyboard.scenes, newScene],
      updatedAt: new Date().toISOString(),
    };

    setStoryboard(updatedBoard);
    setActiveSceneId(newScene.id);
    saveStoryboard(updatedBoard);
  };

  if (!storyboard) {
    return <div>Loading...</div>;
  }

  const Sidebar = () => {
    return (
      <div className="h-grow min-h-screen w-64 bg-[var(--card)] text-[var(--accent)] flex flex-col">
        {storyboard ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[var(--primary)] p-2 rounded-lg">
                      <Film size={20} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <h2 className="font-medium text-base text-[var(--text)] font-editorial">
                        {storyboard.name}
                      </h2>
                      <p className="text-xs text-[var(--accent)]">
                        {storyboard.scenes.length} scenes
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuLabel>Storyboards</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {storyboards.map((board) => (
                  <DropdownMenuItem
                    onClick={() => navigate(`/board/${board.id}`)}
                  >
                    <span>{board.name}</span>
                    <DropdownMenuSeparator />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ScrollArea className="flex-1">
              <div className="py-2">
                {storyboard.scenes.map((scene) => (
                  <div
                    key={scene.id}
                    className={cn(
                      "flex flex-col py-2 px-4 cursor-pointer",
                      storyboard?.id === scene.id && "bg-[var(--hover)]"
                    )}
                    onClick={() => {
                      setActiveSceneId(scene.id);
                    }}
                  >
                    <div className="text-sm font-medium">{scene.title}</div>
                    <div
                      className={cn(
                        "h-[120px] w-full mt-1 rounded bg-[var(--primary)]",
                        storyboard?.id === scene.id &&
                          "border border-[var(--border)]"
                      )}
                    >
                      {/* Scene thumbnail placeholder */}
                    </div>
                  </div>
                ))}

                <div className="px-4 py-4">
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-sidebar-muted text-sidebar-muted-foreground hover:text-sidebar-accent hover:border-sidebar-accent"
                    onClick={() => handleAddScene()}
                  >
                    + Add Scene
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <Film size={48} className="text-sidebar-accent mb-4" />
            <h3 className="text-lg font-medium mb-2">No Story Created</h3>
            <p className="text-sm text-sidebar-muted-foreground mb-4">
              Create a new story to get started with your storyboard.
            </p>
            {/* <Button 
              onClick={() => createStory("Cinema Paradiso", "My new film project")}
              className="bg-sidebar-accent text-white hover:bg-sidebar-accent/80"
            >
              Create Story
            </Button> */}
          </div>
        )}
      </div>
    );
  };
  const activeScene = storyboard.scenes.find(
    (scene) => scene.id === activeSceneId
  );

  return (
    <div className="h-full flex bg-[var(--background)] text-[var(--text)]/80 overflow-y-auto scrollbar-hidden">
      {/* Header with date */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-0"
        )}
      >
        {isSidebarOpen && <Sidebar />}
      </div>
      <DockMenu />
      <Transition>
        <div>
          <div className="p-6 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="z-10 text-[#566555] rounded-full"
              onClick={toggleSidebar}
            >
              <PanelLeftDashed size={16} />
            </Button>
            <div className="text-[var(--accent)] text-sm">{formattedDate}</div>
          </div>

          {/* Scene content */}
          <div className="p-6">
            <input
              type="text"
              value={activeScene?.title}
              onChange={(e) =>
                activeScene
                  ? handleSceneUpdate({ ...activeScene, title: e.target.value })
                  : ""
              }
              className="text-5xl font-editorial bg-transparent border-none focus:outline-none w-full"
              placeholder="Scene Title"
            />

            <div className="flex items-start justify-between">
              {/* Description section */}
              <div className="mb-8">
                <h2 className="text-md font-medium text-[var(--accent)] mb-2">
                  Description
                </h2>
                <DescriptionTiptap text={activeScene?.description || ""} />
              </div>

              {/* Scene stats */}
              <div className="bg-[var(--card)] text-[var(--text)] grid grid-cols-4 gap-8 mb-8 px-8 py-4 rounded-lg">
                <div className="flex flex-col items-center">
                  <Film className="text-[var(--primary)] mb-1" size={24} />
                  <div className="text-xs text-[var(--accent)]">shots</div>
                  <div className="text-2xl font-medium font-editorial text-[var(--text)] mt-4">
                    1
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="text-[var(--primary)] mb-1" size={24} />
                  <div className="text-xs text-[var(--accent)]">characters</div>
                  <div className="text-2xl font-medium font-editorial text-[var(--text)] mt-4">
                    {activeScene?.characters.length}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="text-[var(--primary)] mb-1" size={24} />
                  <div className="text-xs text-[var(--accent)]">locations</div>
                  <div className="text-2xl font-medium font-editorial text-[var(--text)] mt-4">
                    {activeScene?.location.length}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="text-[var(--primary)] mb-1" size={24} />
                  <div className="text-xs text-[var(--accent)]">duration</div>
                  <div className="text-2xl font-medium font-editorial text-[var(--text)] mt-4">
                    30s
                  </div>
                </div>
              </div>

              {/* Scene details form */}
            </div>
            {/* Notes section */}
            <div className="flex items-start justify-between gap-8">
              <div className="mb-10">
                <h2 className="text-md font-medium text-[var(--accent)] mb-2">
                  Notes
                </h2>
                <div className="text-foreground/80 whitespace-pre-wrap max-w-[800px]">
                  <NotesTiptap text={activeScene?.notes || ""} />
                </div>
              </div>

              <div className="space-y-4 mb-10 min-w-[375px] bg-[var(--card)] text-[var(--text)] p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <label className="text-[var(--text)]/80">Character</label>

                  <Select
                    onValueChange={(value) =>
                      activeScene
                        ? handleSceneUpdate({
                            ...activeScene,
                            characters: [value],
                          })
                        : null
                    }
                  >
                    <SelectTrigger className="w-[180px] bg-[var(--input-bg)] text-[var(--text)] border-[var(--border)]">
                      <SelectValue
                        placeholder={activeScene?.characters[0] || "Select"}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--card)] border-[var(--border)]">
                      <AnimatePresence
                        initial={false}
                        mode="popLayout"
                        custom={direction}
                      >
                        <motion.div
                          key={activeIdx}
                          custom={direction}
                          variants={variants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                          }}
                        >
                          {characterOptions.length === 0 ? (
                            <div
                              onClick={() =>
                                setIsCreateCharacterDialogOpen(true)
                              }
                              className="relative flex w-full cursor-default select-none gap-2 items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                              <Plus className="h-4 w-4" />
                              Create New Character
                            </div>
                          ) : (
                            <div>
                              {characterOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                              <div
                                onClick={() =>
                                  setIsCreateCharacterDialogOpen(true)
                                }
                                className="relative flex w-full cursor-default select-none gap-2 items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                              >
                                <Plus className="h-4 w-4" />
                                Create New Character
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-[var(--text)]/80">Location</label>

                  <Select
                    onValueChange={(value) =>
                      activeScene
                        ? handleSceneUpdate({
                            ...activeScene,
                            location: value,
                          })
                        : null
                    }
                  >
                    <SelectTrigger className="w-[180px] bg-[var(--input-bg)] text-[var(--text)] border-[var(--border)]">
                      <SelectValue
                        placeholder={activeScene?.location || "None"}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--card)] border-[var(--border)]">
                      <AnimatePresence
                        initial={false}
                        mode="popLayout"
                        custom={direction}
                      >
                        <motion.div
                          key={activeIdx}
                          custom={direction}
                          variants={variants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                          }}
                        >
                          {locationOptions.length === 0 ? (
                            <div
                              onClick={() =>
                                setIsCreateLocationDialogOpen(true)
                              }
                              className="relative flex w-full cursor-default select-none gap-2 items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                              <Plus className="h-4 w-4" />
                              Create New Location
                            </div>
                          ) : (
                            <div>
                              {locationOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                              <div
                                onClick={() =>
                                  setIsCreateLocationDialogOpen(true)
                                }
                                className="relative flex w-full cursor-default select-none gap-2 items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                              >
                                <Plus className="h-4 w-4" />
                                Create New Location
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-[var(--text)]/80">Camera Angle</label>
                  <Select
                    onValueChange={(value) =>
                      activeScene
                        ? handleSceneUpdate({
                            ...activeScene,
                            cameraAngle: value,
                          })
                        : null
                    }
                  >
                    <SelectTrigger className="w-[180px] bg-[var(--input-bg)] text-[var(--text)] border-[var(--border)]">
                      <SelectValue
                        placeholder={activeScene?.cameraAngle || "Select"}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--card)] border-[var(--border)]">
                      {cameraAngleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-[var(--text)]/80">Time of Day</label>
                  <Select
                    onValueChange={(value) =>
                      activeScene
                        ? handleSceneUpdate({
                            ...activeScene,
                            timeOfDay: value,
                          })
                        : null
                    }
                  >
                    <SelectTrigger className="w-[180px] bg-[var(--input-bg)] text-[var(--text)] border-[var(--border)]">
                      <SelectValue
                        placeholder={activeScene?.timeOfDay || "Select"}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--card)] border-[var(--border)]">
                      {timeOfDayOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="text-[var(--text)] hover:bg-[var(--hover)]"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-[var(--text)]/80">Duration</label>
                  <Select
                    onValueChange={(value) =>
                      activeScene
                        ? handleSceneUpdate({ ...activeScene, duration: value })
                        : null
                    }
                  >
                    <SelectTrigger className="w-[180px] bg-[var(--input-bg)] text-[var(--text)] border-[var(--border)]">
                      <SelectValue
                        placeholder={activeScene?.duration || "Select"}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--card)] border-[var(--border)]">
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <Dialog
        open={isCreateCharacterDialogOpen}
        onOpenChange={setIsCreateCharacterDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Character</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Character Name"
            value={newCharacterName}
            onChange={(e) => setNewCharacterName(e.target.value)}
          />
          <Textarea
            placeholder="Character Description"
            value={newCharacterDescription}
            onChange={(e) => setNewCharacterDescription(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => {
                if (!storyboard) return;

                const newCharacter = newCharacterName;

                // Update storyboard characters
                let updatedCharacters = storyboard.characters
                  ? [...storyboard.characters]
                  : [];
                if (!updatedCharacters.includes(newCharacter)) {
                  updatedCharacters = [...updatedCharacters, newCharacter];
                }

                const updatedBoard = {
                  ...storyboard,
                  characters: updatedCharacters,
                  updatedAt: new Date().toISOString(),
                };

                setStoryboard(updatedBoard);
                setCharacterOptions([
                  ...characterOptions,
                  { value: newCharacter, label: newCharacter },
                ]);
                saveStoryboard(updatedBoard);
                setIsCreateCharacterDialogOpen(false);
                setNewCharacterName("");
                setNewCharacterDescription("");
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isCreateLocationDialogOpen}
        onOpenChange={setIsCreateLocationDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Location</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Location Name"
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
          />
          <Textarea
            placeholder="Location Description"
            value={newLocationDescription}
            onChange={(e) => setNewLocationDescription(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => {
                if (!storyboard) return;

                const newLocation = newLocationName;

                // Update storyboard locations
                let updatedLocations = storyboard.locations
                  ? [...storyboard.locations]
                  : [];
                if (!updatedLocations.includes(newLocation)) {
                  updatedLocations = [...updatedLocations, newLocation];
                }

                const updatedBoard = {
                  ...storyboard,
                  locations: updatedLocations,
                  updatedAt: new Date().toISOString(),
                };

                setStoryboard(updatedBoard);
                setLocationOptions([
                  ...locationOptions,
                  { value: newLocation, label: newLocation },
                ]);
                saveStoryboard(updatedBoard);
                setIsCreateLocationDialogOpen(false);
                setNewLocationName("");
                setNewLocationDescription("");
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
