from pathlib import Path
import json
import regex.regex as re

def generate_resource_list(recipes_path: Path) -> list[str]:
    recipes_path = recipes_path.resolve()

    ls = []

    data: list[tuple[str, str, str, str, str, str, str]] = []
    for brew_file in recipes_path.glob("*.json"):
        brew_name = brew_file.stem
        with open(recipes_path / f"{brew_name}.json", 'r', encoding='utf-8') as f:
            recipe_data = json.load(f)
        
        brewing_data = recipe_data.get("brewing_data", {})
        ingredients_raw = brewing_data.get("inputs", "N/A")

        ingredients = ", ".join(map(lambda x: str((x.get("minCount", -1) + x.get("maxCount", -1)) // 2) + "x " + x.get("item", "N/A"), ingredients_raw))

        brewing_time = brewing_data.get("optimalBrewingTime", "N/A") / 1200
        distillation_item = brewing_data.get("distillingItem", "N/A")
        aging_time = str(brewing_data.get("optimalAgingTime", "N/A") / 1200) + " / " + str(brewing_data.get("optimalAgingTime", "N/A") // 24000)
        aging_wood_types_raw = brewing_data.get("allowedWoodTypes", "N/A")

        if isinstance(aging_wood_types_raw, list) and aging_wood_types_raw:
            aging_wood_types = ", ".join(aging_wood_types_raw)
        else:
            aging_wood_types = "N/A"

        if distillation_item == "":
            distillation_item = "N/A"
        if aging_time == 0:
            aging_time = "N/A"

        data.append((brew_name, ingredients, brewing_time, distillation_item, aging_time, aging_wood_types))
    
    for brew in data:
        for i in brew[1].split(", "):
            i = i.strip().lower()
            m = re.match(r"[0-9]*x", i)
            if m:
                i = i[m.end():].strip()
            if i.startswith("minecraft:") and i not in ls:
                ls.append(i)
    return ls


if __name__ == "__main__":
    ls = generate_resource_list(Path(r"C:\Users\Fabian\AppData\Roaming\ModrinthApp\profiles\RPN-Main (1)\kubejs\data\brewery\recipes"))
    ls += generate_resource_list(Path(r"C:\Users\Fabian\Files\Source\Minecraft\Modding\brewery\src\main\resources\data\brewery\recipes"))
    print(", ".join(ls))
