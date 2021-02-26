const should = require("should");
const loader = require("./index");

describe("php-array-loader", () => {
    it("should produce json object", () => {
        const phpArray = `
            return [
                "key1" => "value1",
                'key2' => 'value2'
                "key3" => 100
            ];
        `;

        const objectExport = loader(phpArray, {}, {});

        const json = objectExport.substr("module.exports = ".length).trim();

        const object = JSON.parse(json);

        should(object).be.eql({
            key1: "value1",
            key2: "value2",
            key3: 100,
        });
    });
});
