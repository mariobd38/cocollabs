package com.stringwiz.app.tag.controller;

import com.stringwiz.app.tag.model.Tag;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.tag.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTag(@AuthenticationPrincipal User user, @RequestBody Tag tag, @RequestParam("taskId") Long task_id) {
        try {
            Tag newTag = tagService.create(user, tag, task_id);
            return ResponseEntity.ok(newTag);
        }
        catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Tag already exists");
        }
    }

    @PutMapping("/addTag")
    public ResponseEntity<?> addExistingTagToTask(@RequestParam("taskId") Long task_id, @RequestParam("tagId") Long tag_id) {
        try {
            Tag addedTag = tagService.addExistingTag(task_id, tag_id);
            return ResponseEntity.ok(addedTag);
        }
        catch (IllegalArgumentException iae) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Tag already exists");
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> getTags(@RequestParam("taskId") Long task_id) {
        Set<Tag> newTag = tagService.getByTask(task_id);
        return ResponseEntity.ok(newTag);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllTags(@AuthenticationPrincipal User user) {
        List<Tag> allTags = tagService.getAllTags(user);
        return ResponseEntity.ok(allTags);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> remove(@RequestParam("taskId") Long task_id, @RequestParam("tagId") Long tag_id) {
        tagService.removeTag(tag_id, task_id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTask(@RequestBody Tag tag) {
        Tag myTag = tagService.update(tag);
        return ResponseEntity.ok(myTag);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam("tagId") Long tag_id) {
        tagService.delete(tag_id);
        return ResponseEntity.noContent().build();
    }
}
