package com.stringwiz.app.tag.util;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Data
@AllArgsConstructor
public class TagColorsUtil {
    List<String> colors = new ArrayList<>();

    public TagColorsUtil() {
        this.colors = getColors();
    }


    public String sendRandomColor(List<String> existingColors) {
        List<String> availableColors = new ArrayList<>(colors);
        for(String color : existingColors) {
            availableColors.remove(color);
        }
        if (availableColors.isEmpty()) {
            int randomIndex = new Random().nextInt(colors.size());
            return colors.get(randomIndex);
        }

        int randomIndex = new Random().nextInt(availableColors.size());
        return availableColors.get(randomIndex);
    }

    private List<String> getColors() {
        return List.of(
                "#fb7185", //rose
                "#f472b6", //pink
                "#c084fc", //purple
                "#60a5fa", //blue
                "#22b3be", //cyan
                "#2da49f", //teal
                "#4abe60", //green
                "#daac15", //yellow
                "#fb923c", //orange
                "#9ca3af"  //gray
        );
    }

}
