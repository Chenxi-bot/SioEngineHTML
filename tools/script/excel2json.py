import json
import xlrd


class Scenario:
    def __init__(self, name, id) -> None:
        self.name = name
        self.id = id
        self.length = 0
        self.content = list()

    def addLine(self, value) -> None:
        tmp = dict()
        tmp["name"] = value[1]
        tmp["text"] = value[2]
        tmp["anime"] = {"picname": value[3], "picfp":value[4],"posx":value[5], "posy":value[6], "anime":value[7], "soundpath":value[8], "repeat":value[9], "parameter":value[10].split(";")}
        self.content.append(tmp)

    def readExcel(self, fp):
        data = xlrd.open_workbook(fp)
        table = data.sheets()[0]
        for i in range(2, table.nrows):
            value = table.row_values(i)
            self.addLine(value)
    def write(self, fp):
        result = {"name": self.name, "id": self.id, "length": len(self.content), "content": self.content}
        print(json.dumps(result))
        with open(fp, "w+", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False)

instance = Scenario("测试章节", 1)
instance.readExcel("tools\\script\\tools.xls")
instance.write("resources\\scenario\\test.json")