const should = require("should");
const loader = require("./index");

describe("php-array-loader", () => {
    it("should produce json object", () => {
        const phpArray = `
            return [
                "key1" => "value1",
                'key2' => 'value2'
                "key3" => 100,
                "key4" => true,
                "key5" => false
            ];
        `;

        const objectExport = loader(phpArray, {}, {});

        const json = objectExport.substr("module.exports = ".length).trim();

        const object = JSON.parse(json);

        should(object).be.eql({
            key1: "value1",
            key2: "value2",
            key3: 100,
            key4: true,
            key5: false,
        });
    });

    it("should correctly unescape single quote", () => {
        /**
         * Webpack loads string: 'Don'\t' with double backslash/
         */
        const phpArray = `
            return [
                'key' => 'Don\\'t.'
            ];
        `;

        const objectExport = loader(phpArray, {}, {});

        const json = objectExport.substr("module.exports = ".length).trim();

        const object = JSON.parse(json);

        should(object).be.eql({
            key: "Don't.",
        });
    });

    it("should correctly unescape multiple single quotes in the same string", () => {
        const phpArray = `
            return [
                'key' => 'Joining adds you to this academy\\'s roster. You\\'ll be eligible.'
            ];
        `;

        const objectExport = loader(phpArray, {}, {});

        const json = objectExport.substr("module.exports = ".length).trim();

        const object = JSON.parse(json);

        should(object).be.eql({
            key: "Joining adds you to this academy's roster. You'll be eligible.",
        });
    });
});
