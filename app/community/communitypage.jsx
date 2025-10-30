import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns"; // Import the date formatting function

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CommunityPage({ user }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [discussions, setDiscussions] = useState([]);

  // Fetch discussions from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/discussions")
      .then((res) => setDiscussions(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle upvote or downvote
  const handleVote = (id, type) => {
    const endpoint =
      type === "upvote"
        ? `http://localhost:5000/api/discussions/${id}/upvote`
        : `http://localhost:5000/api/discussions/${id}/downvote`;

    axios
      .patch(endpoint)
      .then((res) => {
        setDiscussions((prev) =>
          prev.map((discussion) =>
            discussion._id === id ? res.data : discussion
          )
        );
      })
      .catch((err) => console.error(err));
  };

  // Handle form submission for creating a new discussion
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to create a discussion.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const newDiscussion = {
      title: formData.get("title"),
      description: formData.get("description"),
      upvotes: 0,
      downvotes: 0,
      userName: user.displayName, // Use user displayName
      userImage: user.photoURL, // Use user photoURL
    };

    axios
      .post("http://localhost:5000/api/discussions", newDiscussion)
      .then((res) => {
        setDiscussions((prev) => [res.data, ...prev]);
        setIsDialogOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="font-montreal flex min-h-screen bg-[#E5F4DD]">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-medium text-[#314328] mb-2">
              "Connect, Share, And Support"
            </h1>
            <p className="text-gray-600">
              A Safe And Welcoming Space To Share Your Thoughts, Ask Questions, And Connect With Others On Their Mental Wellness Journey.
            </p>
          </div>

          {/* Button Section */}
          <div className="mb-12">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-full bg-[#A9C89A] text-white hover:bg-[#68835B]"
              size="lg"
            >
              Join The Conversation
            </Button>
          </div>

          {/* Discussions Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-[#314328] mb-4">
              Recent Discussions
            </h2>
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card
                  key={discussion._id}
                  className="p-4 bg-[#F9FDF7] rounded-lg shadow-lg border-[#C5E1A5] border-2"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={discussion.userImage || "/placeholder.svg"}
                      alt={`${discussion.userName}'s avatar`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-[#558B2F]">
                      {discussion.userName || "Anonymous"} •{" "}
                      {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2 text-[#264e16]">
                    {discussion.title}
                  </h3>
                  <p className="mb-4 text-md text-[#558B2F]">
                    {discussion.description}
                  </p>
                  <div className="flex justify-end gap-2">
                    {/* Upvote Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(discussion._id, "upvote")}
                      className="border-[#C5E1A5] text-[#33691E] hover:bg-[#C5E1A5] hover:text-[#33691E]"
                    >
                      <ChevronUp className="mr-1 h-4 w-4" />
                      Upvote ({discussion.upvotes})
                    </Button>

                    {/* Downvote Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(discussion._id, "downvote")}
                      className="border-[#C5E1A5] text-[#33691E] hover:bg-[#C5E1A5] hover:text-[#33691E]"
                    >
                      <ChevronDown className="mr-1 h-4 w-4" />
                      Downvote ({discussion.downvotes})
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Dialog for Creating New Discussion */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a Discussion</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter a title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter a description"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button
                      type="submit"
                      className="hover:bg-[#A9C89A] text-white bg-[#68835B]"
                    >
                      Create Discussion
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="border-[#C5E1A5] text-[#33691E]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
