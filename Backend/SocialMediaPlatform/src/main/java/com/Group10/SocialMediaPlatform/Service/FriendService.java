package com.Group10.SocialMediaPlatform.Service;

import com.Group10.SocialMediaPlatform.model.Friend;
import com.Group10.SocialMediaPlatform.model.FriendId;
import com.Group10.SocialMediaPlatform.Repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendService {
    @Autowired
    private FriendRepository friendRepository;

    public Friend addFriend(Friend friend) {
        if (friend.getId() == null || friend.getId().getUserId() == null || friend.getId().getFriendId() == null) {
            throw new IllegalArgumentException("FriendId and its components cannot be null");
        }
        if (friend.getUser() == null || friend.getFriend() == null) {
            throw new IllegalArgumentException("User and Friend cannot be null");
        }
        return friendRepository.save(friend);
    }

    public List<Friend> getFriendsByUserId(Integer userId) {
        return friendRepository.findByUser_UserId(userId);
    }

    public void removeFriend(FriendId friendId) {
        friendRepository.deleteById(friendId);
    }

    public List<Friend> getAllFriendsForUser(Integer userId) {
        List<Friend> friends = friendRepository.findByUser_UserId(userId);
        friends.addAll(friendRepository.findByFriend_UserId(userId));
        return friends;
    }
}
